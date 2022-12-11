import { MdBookmarkAdd, MdBookmarkRemove } from "react-icons/md";
import { addBookmarks, removeBookmarks } from "../firebase/firestore";
import { selectUserBookmarkedTopics } from "../redux/features/userSlice";
import { useAppSelector } from "../redux/store";
import Button from "./Button";
import {
  errorNotificationCreator,
  successNotificationCreator,
} from "../utils/functions/notificationUtil";
import { useNotification } from "../hooks/useNotification";
type BookmarkButtonProps = {
  topicId: string;
  periodId: string;
  studentId: string;
};

function BookmarkButton({ topicId, periodId, studentId }: BookmarkButtonProps) {
  const bookmarkedTopics = useAppSelector(selectUserBookmarkedTopics);
  const showNotification = useNotification();
  const isInBookmarks = bookmarkedTopics
    ? Object.values(bookmarkedTopics).flat().includes(topicId)
    : false;

  function handleBookmarkTopic() {
    try {
      addBookmarks(studentId, periodId, topicId);
      showNotification(
        successNotificationCreator("Đã thêm vào danh sách quan tâm")
      );
    } catch (error) {
      showNotification(errorNotificationCreator("Đã có lỗi xảy ra"));
    }
  }

  function handleRemoveBookmark() {
    removeBookmarks(studentId, periodId, topicId);
    console.log("Removed bookmark");
  }
  return (
    <div>
      {isInBookmarks ? (
        <Button buttonType="info" onClick={handleRemoveBookmark}>
          <MdBookmarkRemove size={15} />
        </Button>
      ) : (
        <Button onClick={handleBookmarkTopic}>
          <MdBookmarkAdd size={15} />
        </Button>
      )}
    </div>
  );
}

export default BookmarkButton;
