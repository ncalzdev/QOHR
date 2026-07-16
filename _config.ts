import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import icons from "lume/plugins/icons.ts";

const site = lume();

site.use(date());
site.use(icons({
  folder: "/assets/icons",
}));

site.add("/styles.css");
site.add("/img");
site.add("/assets");

export default site;
