import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoryContext } from "../../context/storyContext";
import StyledChapter from "./styles/Chapter.styled";
import { Conversation } from "../../components";
import Respond from "../../components/Respond";
function Chapter() {
  const { state, getChapter, addChapterConv, addConvComment } =
    useContext(StoryContext);
  const { story_id, chapter_id } = useParams();

  //u dont need getChapterConv as it seems!
  useEffect(() => {
    getChapter(story_id, chapter_id);
  }, []);

  return (
    <StyledChapter>
      <section className="chapter">
        <h1>{state.chapter.title}</h1>
        <div className="content">{state.chapter.content}</div>
      </section>

      <div className="comments">
        <Respond
          type="someone commented on your story"
          to={state.author.name}
          dest={chapter_id}
          addComment={addChapterConv}
        />
        {state.chapterConvs?.map((comment) => {
          return (
            <Conversation
              key={comment._id}
              conv={comment}
              addConvComment={addConvComment}
            />
          );
        })}
      </div>
    </StyledChapter>
  );
}

export default Chapter;
