import classes from "../styles/Ai-Agents-ready-use.module.css";
import { IntegrationsShowcase } from "./IntegrationsShowcase";


const showcaseCards = [
  {
    title: "Social poster",
    description: (
      <>
        Multi-channel posting with automatic post
        <br />
        creation.
      </>
    ),
    image: "/Hero/box-1-mask-group.png",
},
{
    title: "DM chatbot",
    description: (
        <>
        Smart replies and support through the
        <br />
        DMs via chatbots.
      </>
    ),
    image: "/Hero/image.png",
},
{
    title: "Comment-to-DM",
    description: (
        <>
        Keyword-based link promotions for
        <br />
        discounts, offers or courses.
      </>
    ),
    image: "/Hero/box-1-mask-group-2.png",
},
];

export const SectionShowcase = () => {
  return (
    <>
      <section className={classes.sectionShowcase}>
        <div className={classes.intro}>
          <div className={classes.badgeWrapper}>
            <div className={classes.badge}>
              <span className={classes.badgeLabel}>AI agents</span>
            </div>
          </div>
          <div className={classes.headingWrapper}>
            <h2 className={classes.heading}>AI agents ready to use.</h2>
          </div>
          <div className={classes.descriptionWrapper}>
            <p className={classes.description}>
              AI agent templates are designed to automate social media, DMs and
              <br />
              engagement. Or build your own personal agent!
            </p>
          </div>
        </div>
        <div className={classes.cardGrid}>
          {showcaseCards.map((card) => (
            <div className={classes.cardWrapper} key={card.title}>
              <article className={classes.card}>
                <div className={classes.cardTitleWrapper}>
                  <h3 className={classes.cardTitle}>{card.title}</h3>
                </div>
                <div className={classes.cardDescriptionWrapper}>
                  <p className={classes.cardDescription}>{card.description}</p>
                </div>
                <div className={classes.pricingWrapper}>
                  <div className={classes.pricingLink}>
                    <span className={classes.pricingLabel}>See pricing</span>
                    <span className={classes.arrow} aria-hidden="true" />
                  </div>
                </div>
                <img
                  className={classes.cardImage}
                  alt={card.title}
                  src={card.image}
                />
              </article>
            </div>
          ))}
        </div>
      </section>
      <IntegrationsShowcase />
    </>
  );
};
