import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoryContext } from "../../context/storyContext";
import StyledChapter from "./styles/Chapter.styled";
import { Conversation } from "../../components";
import Respond from "../../components/Respond";
function Chapter() {
  const { state, getChapter, addChapterConv } = useContext(StoryContext);
  const { story_id, chapter_id } = useParams();

  //u dont need getChapterConv as it seems!
  useEffect(() => {
    getChapter(story_id, chapter_id);
  }, [addChapterConv]);

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
          soluta adipisci fuga. Error iusto molestiae nemo facere? Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Architecto ipsa ratione
          aliquam quibusdam consectetur ex reiciendis illo ut magnam quo
          dolorem, necessitatibus aut officiis cupiditate animi saepe? Neque
          adipisci aut dolor, eius hic illum vero eveniet iusto inventore
          nesciunt ex eos velit numquam dolorum dignissimos ipsum quam
          reprehenderit pariatur similique. Laborum, voluptas quasi? Natus,
          maiores obcaecati totam aperiam, sunt iure, quisquam cum nesciunt
          excepturi dolorem nobis corporis! Earum sint corrupti fugiat quaerat
          consectetur voluptas vitae consequuntur animi, eveniet, est sed non
          repellendus nulla odio ex amet commodi? Ratione rerum dolorem deleniti
          rem debitis nobis aperiam quae, vero aut numquam. Culpa optio hic
          magnam, nulla perferendis, earum alias est quidem illum provident
          omnis ipsam mollitia eos! Dolorem at eligendi repellendus maiores
          nobis ullam, optio non vero totam excepturi obcaecati qui nihil
          aliquid ab laboriosam asperiores veritatis doloribus dignissimos eos
          quae iure? Cum, quos quod. Deserunt minima saepe temporibus nesciunt
          quisquam. Quidem optio sequi eius ipsa quae neque voluptatibus,
          quibusdam consequuntur exercitationem, quia odio nulla cum facilis rem
          accusantium consequatur nihil magni. Incidunt ipsum eligendi, illum
          illo laboriosam voluptas nisi? Quis perspiciatis ad incidunt mollitia
          voluptates porro illo et libero doloribus ipsa minus accusamus fugiat
          voluptatum dolores officiis, officia at. Ipsum quasi numquam adipisci
          tempora illo minus, corporis accusamus assumenda molestias soluta
          incidunt! Eveniet doloribus alias mollitia ipsum repudiandae suscipit?
          Debitis reiciendis vitae reprehenderit aperiam ad iste a. Sed enim
          corporis quae quia, tempore aspernatur ducimus veritatis, laborum
          tempora nostrum quaerat error nihil rerum eaque accusantium ipsa
          similique minima consequatur eius nesciunt ab quas! Corrupti
          perferendis voluptas aspernatur rem fuga aliquam animi fugit ipsam
          iusto quos deserunt delectus, quibusdam dolore eaque excepturi
          reprehenderit maiores autem illum. Culpa fuga, perspiciatis ea
          distinctio iusto quos magni id architecto vel aliquid sunt velit
          dignissimos quasi quas veniam autem soluta odio magnam blanditiis
          suscipit nam voluptatibus laborum quam! Maiores adipisci neque porro,
          eligendi quia laboriosam tempore facilis eaque necessitatibus
          doloremque eveniet culpa repellendus odio, corporis molestiae quo
          praesentium amet rerum odit. Fuga ut eaque excepturi in exercitationem
          incidunt fugit, ab, velit numquam adipisci rem quibusdam illum
          corrupti ratione deleniti? Impedit quod quasi, culpa beatae omnis
          laborum aperiam corrupti. Quis distinctio repellat fugit,
          exercitationem, cum repellendus accusantium nisi alias veritatis enim
          consectetur nobis blanditiis quas, voluptatibus neque ea laboriosam
          dolorum eum optio similique facilis quae! Sint quisquam temporibus
          dolorum suscipit sit, harum ut. Iste soluta modi fuga eius sapiente
          fugiat nihil amet aliquam, consectetur quibusdam. Aut, eaque?
          Molestiae quaerat aliquam harum. Tenetur rerum natus eum ex atque nisi
          voluptatibus impedit beatae quo. Enim nihil quia hic velit alias saepe
          in, magnam, praesentium accusantium harum aut natus? Exercitationem
          esse perspiciatis saepe aliquam sed recusandae sunt modi amet dolores,
          laudantium vero itaque. Ipsa blanditiis sapiente neque, quidem fugit
          expedita obcaecati. Neque consequuntur nam, tempore obcaecati maiores
          corporis laudantium perferendis illo iure praesentium ducimus totam
          reprehenderit hic earum rem magnam molestias impedit facilis.
          Blanditiis eligendi minus molestiae sapiente atque aut eos est odit
          inventore temporibus expedita laudantium adipisci consectetur possimus
          itaque eius a quia assumenda beatae quo delectus repudiandae id,
          dolorum libero. Velit obcaecati vitae eligendi voluptates nemo fugiat
          aperiam facilis excepturi praesentium id at incidunt, exercitationem
          aut tempore natus debitis quia porro sapiente eveniet, delectus, esse
          ex iste rem? Officiis optio earum molestiae error veritatis in
          expedita assumenda explicabo qui dolorum a, cupiditate rem. Numquam
          itaque tempora sunt veritatis accusamus reprehenderit laboriosam unde
          dolore obcaecati repellendus nobis dolor officia nulla cumque delectus
          omnis, eius quam. Eligendi alias hic et ut culpa molestiae repudiandae
          fugiat aperiam omnis ducimus corporis odio sunt recusandae, aspernatur
          vitae nam sed corrupti incidunt nobis consequuntur officiis beatae
          fugit quisquam temporibus! Quas facere, voluptatem omnis a quaerat
          rem. Tempore, sed nesciunt? Hic, eaque sequi officia modi ullam
          dolores, architecto fuga accusamus culpa dolorem quas, libero
          exercitationem maiores itaque adipisci excepturi molestiae consectetur
          voluptatibus! Nemo, tempore omnis dolore nulla quidem est delectus
          assumenda sequi quisquam dolorum accusamus vel harum maiores quam quos
          sit atque incidunt, asperiores quibusdam eum molestiae! Deserunt
          minima maxime sit tempora ad, neque illo, molestias quis commodi
          quidem aspernatur sequi eveniet sunt, quaerat debitis nemo eaque
          asperiores eos consequatur? Ipsam, harum unde, saepe nobis quidem
          dolor facere omnis maxime praesentium porro sapiente iste. Minima
          earum, illo voluptatibus aut illum quos rerum. Blanditiis accusamus
          aliquam, corporis aspernatur atque, esse voluptas commodi quibusdam
          minima suscipit quod adipisci, distinctio quas culpa doloremque
          deleniti doloribus voluptates consequuntur earum non officia! Culpa
          optio placeat deleniti temporibus voluptatum animi doloribus nisi
          provident et ad ab voluptates, voluptate eligendi esse saepe fugit
          omnis in vitae aliquid rem nam molestias nulla! Laudantium quis saepe
          ad id necessitatibus quas possimus quasi quos aut quam ipsa dicta,
          placeat ut vel voluptas, cupiditate unde fuga suscipit molestias odit
          assumenda fugit sit dolorem delectus. Excepturi facere maiores quas
          ullam ratione vero quibusdam corrupti iusto nisi ipsam est dolor
          aperiam ab quo velit, at obcaecati enim aut tempore blanditiis neque!
          Ratione, voluptates maiores, magni facere quaerat quasi quis inventore
          rerum, praesentium voluptate enim atque beatae cum tenetur
          reprehenderit architecto corrupti. Labore velit dolore itaque aut
          aperiam non incidunt, eaque illo explicabo eius quis quidem corrupti
          odit similique obcaecati officiis magni odio ad sed architecto ipsam
          error quos ducimus. Repellat consectetur assumenda ducimus harum
          culpa. Ut nobis asperiores voluptates commodi suscipit omnis, delectus
          facere accusamus nulla excepturi a nesciunt repellendus laboriosam
          temporibus dicta maxime distinctio ab voluptatum minus nemo hic ullam.
          Repellendus minima odit et. Cupiditate numquam, porro in magnam odio
          optio incidunt, eius reprehenderit tempora illum praesentium impedit
          voluptatem dolore excepturi rem, vero eveniet minima pariatur
          perferendis quisquam natus officia iusto? Molestias amet quae atque
          deleniti eum. Animi magnam tempora provident illo! Sapiente obcaecati
          saepe in ea, ab quam quibusdam quidem adipisci, aliquam, quo est
          perspiciatis cumque. Incidunt quam enim nobis maxime architecto
          placeat possimus quae porro nihil dolorem eligendi optio reprehenderit
          sed corporis fugit doloremque obcaecati amet vero deleniti quidem,
          commodi provident maiores excepturi. Esse molestiae dolorem quia iusto
          repudiandae debitis, unde non? Deleniti blanditiis aliquam, pariatur
          accusantium inventore eius, eum maxime possimus voluptatem impedit
          quas omnis ipsam culpa. Est molestiae error adipisci, voluptate
          corrupti nesciunt.
        </div>
      </section>
      <div className="comments">
        <Respond
          type="someone commented on your story"
          to={state.story.author.name}
          dest={chapter_id}
          addComment={addChapterConv}
        />
        {state.chapter?.comments?.map((comment) => {
          return (
            <Conversation
              key={comment._id}
              author={comment.author}
              comment={comment}
            />
          );
        })}
      </div>
    </StyledChapter>
  );
}

export default Chapter;
