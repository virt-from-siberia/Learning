import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import React from "react";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";

import { withLayout } from "../../layout/Layout";
import { firstLevelMenu } from "../../helpers/helpers";

import { MenuItem } from "../../interfaces/menu.interface";

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}

function Type({ firstCategory }: TypeProps): JSX.Element {
  return <>Type : {firstCategory}</>;
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map((m) => "/" + m.route),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) return { notFound: true };

  const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type);
  if (!firstCategoryItem) return { notFound: true };

  const { data: menu } = await axios.post<MenuItem[]>(
    "https://courses-top.ru/api/top-page/find",
    {
      firstCategory: firstCategoryItem.id,
    }
  );

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id,
    },
  };
};
