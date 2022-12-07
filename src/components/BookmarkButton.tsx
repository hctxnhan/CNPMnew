import { MdBookmarkAdd, MdBookmarkRemove } from 'react-icons/md';
import { addBookmarks, removeBookmarks } from '../firebase/firestore';
import { selectUserBookmarkedTopics } from '../redux/features/userSlice';
import { useAppSelector } from '../redux/store';
import Button from './Button';

type BookmarkButtonProps = {
  topicId: string;
  periodId: string;
  studentId: string;
};

function BookmarkButton({ topicId, periodId, studentId }: BookmarkButtonProps) {
  const bookmarkedTopics = useAppSelector(selectUserBookmarkedTopics);

  const isInBookmarks = bookmarkedTopics
    ? Object.values(bookmarkedTopics).flat().includes(topicId)
    : false;

  function handleBookmarkTopic() {
    addBookmarks(studentId, periodId, topicId);
    console.log('Bookmarked');
  }

  function handleRemoveBookmark() {
    removeBookmarks(studentId, periodId, topicId);
    console.log('Removed bookmark');
  }
  return (
    <div>
      {isInBookmarks ? (
        <Button buttonType='info' onClick={handleRemoveBookmark}>
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
