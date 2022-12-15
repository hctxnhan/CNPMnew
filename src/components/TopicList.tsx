import Topic from "../utils/types/Topic";
import TopicComponent from "./TopicComponent";

type TopicListProps = {
  topics: Topic[];
  period: string;
};

function TopicList({ topics, period }: TopicListProps) {
  return (
    <div className="grid grid-cols-3 gap-4 lg:grid-cols-2 md:grid-cols-1">
      {topics.map((topic) => (
        <TopicComponent key={topic.id} topic={topic} period={period} />
      ))}
    </div>
  );
}

export default TopicList;
