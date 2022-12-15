import { GrClose } from "react-icons/gr";
import { HiDocumentRemove } from "react-icons/hi";
import { addTopicToAppliedTopics, removeTopic } from "../firebase/firestore";
import useCheckActiveTopic from "../hooks/useCheckActiveTopic";
import useConfirmPopup from "../hooks/useConfirmPopup";
import { useNotification } from "../hooks/useNotification";
import useUserRole from "../hooks/useUserRole";
import { selectEducatorById } from "../redux/features/educatorSlice";
import {
  closeTopicDetail,
  selectTopicId,
  selectTopicOpen,
} from "../redux/features/topicDetailSlice";
import {
  selectTopicById,
  selectTopicPeriodId,
} from "../redux/features/topicSlice";
import {
  selectUserAppliedTopics,
  selectUserId,
  selectUserJoinedTopic,
} from "../redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  errorNotificationCreator,
  successNotificationCreator,
} from "../utils/functions/notificationUtil";
import UserRole from "../utils/types/UserRole";
import AppliedStudentList from "./AppliedStudentList";
import BookmarkButton from "./BookmarkButton";
import Button from "./Button";
import CheckVisible from "./CheckVisible";
import ConfirmationPopup from "./ConfirmationPopup";
import NormalModal from "./NormalModal";
import Portal from "./Portal";
import SelectEvaluationMember from "./SelectEvaluationMember";
import UserComponent from "./UserComponent";
import WithOverlay from "./WithOverlay";

function TopicDetail() {
  const applyTopic = useConfirmPopup(() => {
    if (!userId) return;
    try {
      addTopicToAppliedTopics(userId, topicId);
      showNotification(
        successNotificationCreator("Đã gửi yêu cầu tham gia đề tài thành công")
      );
    } catch (e) {
      showNotification(
        errorNotificationCreator("Đã có lỗi xảy ra, vui lòng thử lại sau")
      );
    }
  });
  const showNotification = useNotification();
  const deleteTopic = useConfirmPopup(() => {
    try {
      removeTopic(periodId, topicId);
      dispatch(closeTopicDetail());
      showNotification(successNotificationCreator("Đã xóa đề tài thành công"));
    } catch (e) {
      showNotification(
        errorNotificationCreator("Đã có lỗi xảy ra, vui lòng thử lại sau")
      );
    }
  });
  const addEvaluation = useConfirmPopup(() => {
    console.log("addEvaluation");
  });

  const studentListPopup = useConfirmPopup(() => {});

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectTopicOpen);

  const topicId = useAppSelector(selectTopicId);
  const topic = useAppSelector((state) => selectTopicById(state, topicId));
  const isInPeriod = useCheckActiveTopic(topicId);

  const periodId = useAppSelector((state) =>
    selectTopicPeriodId(state, topicId)
  );

  const hasJoinedTopic = useAppSelector(selectUserJoinedTopic) !== null;

  const isEducator = useUserRole(UserRole.EDUCATOR);

  const userId = useAppSelector(selectUserId);

  const educator = useAppSelector((state) => {
    if (topic) {
      return selectEducatorById(state, topic?.educatorId);
    }
  });

  function handleClose() {
    dispatch(closeTopicDetail());
  }

  const appliedTopics = useAppSelector(selectUserAppliedTopics);
  const isApplied = appliedTopics?.includes(topicId) || false;

  return (
    <Portal>
      <Portal wrapperId="popup">
        <CheckVisible
          allowedRoles={[UserRole.STUDENT]}
          rules={applyTopic.isOpen}
        >
          <WithOverlay>
            <ConfirmationPopup
              title="Bạn có muốn đăng ký đề tài này không?"
              description="Bạn cần đợi giảng viên phê duyệt để có thể tham gia đề tài này"
              {...applyTopic}
            />
          </WithOverlay>
        </CheckVisible>

        <CheckVisible
          allowedRoles={[UserRole.EDUCATOR]}
          rules={deleteTopic.isOpen}
        >
          <WithOverlay>
            <ConfirmationPopup
              title="Bạn có muốn xóa đề tài này không?"
              description="Bạn sẽ không thể khôi phục lại đề tài này"
              {...deleteTopic}
            />
          </WithOverlay>
        </CheckVisible>

        <CheckVisible
          allowedRoles={[UserRole.EDUCATOR]}
          rules={isInPeriod && studentListPopup.isOpen}
        >
          <WithOverlay>
            <NormalModal
              title="Danh sách sinh viên chờ phê duyệt vào đề tài này"
              onClose={studentListPopup.onCancel}
            >
              <AppliedStudentList periodId={periodId} topicId={topicId} />
            </NormalModal>
          </WithOverlay>
        </CheckVisible>

        <CheckVisible
          allowedRoles={[UserRole.HEAD_OF_DEPARTMENT]}
          rules={addEvaluation.isOpen}
        >
          <WithOverlay>
            <NormalModal
              title="Thêm đánh giá cho đề tài này"
              onClose={addEvaluation.onCancel}
            >
              <SelectEvaluationMember periodId={periodId} topicId={topicId} />
            </NormalModal>
          </WithOverlay>
        </CheckVisible>
      </Portal>

      <div
        className="bg-white fixed top-0 right-0 bottom-0 left-2/3 px-6 py-4 border-l-4 border-emerald-500 overflow-y-scroll"
        hidden={!isOpen}
      >
        <div className="flex mb-4">
          <div className="flex-grow"></div>
          <button
            onClick={handleClose}
            className="border w-[30px] h-[30px] rounded-md flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-all"
          >
            <GrClose size={20} />
          </button>
        </div>
        <CheckVisible allowedRoles={[UserRole.GUEST]} rules={topic !== null}>
          {topic && (
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xs uppercase -mb-2">
                <span className="bg-emerald-500 text-[10px] text-white p-1 rounded-md">
                  {topic.specialization}
                </span>
              </p>
              <div className="flex justify-between">
                <div className="flex-grow">
                  <h1 className="text-2xl font-semibold">{topic.name}</h1>
                </div>
                <div>
                  <CheckVisible
                    rules={userId !== undefined}
                    allowedRoles={[UserRole.STUDENT]}
                  >
                    {userId && (
                      <BookmarkButton
                        periodId={periodId}
                        studentId={userId}
                        topicId={topicId}
                      />
                    )}
                  </CheckVisible>

                  {isEducator && topic.educatorId === userId && (
                    <div className="flex items-center gap-2">
                      <Button
                        buttonType="danger"
                        onClick={() => {
                          deleteTopic.open();
                        }}
                      >
                        <HiDocumentRemove size={15} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <p className="">{topic.description}</p>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Giảng viên hướng dẫn</p>
                <div>{educator && <UserComponent userId={educator.id} />}</div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Mục tiêu</p>
                <div className="flex gap-2 flex-wrap">
                  {topic.outcomes.map((outcome, index) => (
                    <p
                      key={index}
                      className="text-xs px-2 py-1 bg-gray-300 text-gray-600 rounded-md"
                    >
                      {outcome}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <p className="font-semibold">Danh sách hội đồng phản biện</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {topic.evaluationMembers.map((member) => {
                    return <UserComponent key={member} userId={member} />;
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 flex items-center">
                  <p className="font-semibold">Danh sách sinh viên</p>
                  <p className="text-gray-400 text-sm">
                    ({topic.members.length || 0}/
                    <span className="text-gray-400 text-sm">
                      {topic.numberOfMembers}
                    </span>
                    )
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {topic.members.map((member) => {
                    return <UserComponent key={member} userId={member} />;
                  })}
                </div>
              </div>

              <CheckVisible
                rules={isInPeriod}
                allowedRoles={[UserRole.STUDENT]}
              >
                <>
                  <CheckVisible
                    allowedRoles={[UserRole.STUDENT]}
                    rules={hasJoinedTopic}
                  >
                    <p className="text-sm text-gray-400 font-">
                      Bạn đã tham gia đề tài khác
                    </p>
                  </CheckVisible>

                  <CheckVisible
                    allowedRoles={[UserRole.STUDENT]}
                    rules={!hasJoinedTopic}
                  >
                    <CheckVisible
                      allowedRoles={[UserRole.STUDENT]}
                      rules={isApplied}
                    >
                      <Button buttonType="disabled">
                        Bạn đã đăng ký đề tài này
                      </Button>
                    </CheckVisible>

                    <CheckVisible
                      allowedRoles={[UserRole.STUDENT]}
                      rules={!isApplied}
                    >
                      <CheckVisible
                        allowedRoles={[UserRole.STUDENT]}
                        rules={topic.members.length >= topic.numberOfMembers}
                      >
                        <Button buttonType="disabled">
                          Đề tài đã đủ thành viên
                        </Button>
                      </CheckVisible>

                      <CheckVisible
                        allowedRoles={[UserRole.STUDENT]}
                        rules={topic.members.length < topic.numberOfMembers}
                      >
                        <Button
                          buttonType="secondary"
                          onClick={() => applyTopic.open()}
                        >
                          Đăng ký đề tài này
                        </Button>
                      </CheckVisible>
                    </CheckVisible>
                  </CheckVisible>
                </>
              </CheckVisible>
              <CheckVisible
                allowedRoles={[UserRole.EDUCATOR]}
                rules={isInPeriod}
              >
                <Button
                  buttonType="secondary"
                  onClick={() => studentListPopup.open()}
                >
                  Danh sách chờ
                </Button>
              </CheckVisible>
              <CheckVisible
                allowedRoles={[UserRole.HEAD_OF_DEPARTMENT]}
                rules={isInPeriod}
              >
                <Button
                  buttonType="secondary"
                  onClick={() => addEvaluation.open()}
                >
                  Hội đồng phản biện
                </Button>
              </CheckVisible>
            </div>
          )}
        </CheckVisible>
      </div>
    </Portal>
  );
}

export default TopicDetail;
