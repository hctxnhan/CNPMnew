import { useState } from 'react';

function useTagInput() {
  const [tags, setTags] = useState<string[]>([]);

  const addTag = (tag: string) => {
    if (tags.includes(tag)) return;
    setTags([...tags, tag]);
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return { tags, addTag, removeTag };
}

export default useTagInput;
