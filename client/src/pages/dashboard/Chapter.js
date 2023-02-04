import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StoryContext } from "../../context/storyContext";
import StyledChapter from "./styles/Chapter.styled";

function Chapter() {
  const { state, getChapter, getStory } = useContext(StoryContext);
  const { story_id, chapter_id } = useParams();
  useEffect(() => {
    getChapter(story_id, chapter_id);
  }, []);
  return (
    <StyledChapter>
      <section className="chapter">
        <h1>{state.chapter.title}</h1>
        <div className="content">
          {state.chapter.content} Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quo mollitia vel, molestiae natus quia placeat sit
          et? Obcaecati laboriosam magnam non aut dolorum dolores dolor!
          Temporibus sunt rerum debitis eos, impedit inventore perferendis neque
          eligendi omnis quaerat atque quae quod ut itaque blanditiis,
          recusandae consequatur. Ullam sed provident accusamus distinctio quas
          blanditiis, doloribus dolorem quidem natus nihil eveniet totam sit nam
          rerum deserunt. Vitae, sequi quisquam. Qui ea, facere vel eum cum in
          ducimus hic explicabo, aut ipsam harum a repellat laboriosam deserunt
          dolor sequi voluptates nulla fugiat, temporibus possimus autem amet
          soluta adipisci fuga. Error iusto molestiae nemo facere?
        </div>
      </section>
    </StyledChapter>
  );
}

export default Chapter;
