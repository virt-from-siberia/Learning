import React from "react";
import cn from "classnames";

import { TopPageComponentsProps } from "./TopPageComponent.props";
import { Htag } from "../../components/Htag/Htag";
import { Tag } from "../../components/Tag/Tag";
import { HhData } from "../../components/HhData/HhData";
import { Card } from "../../components/Card/Card";
import { TopLevelCategory } from "../../interfaces/toppage.interface";

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentsProps): JSX.Element => {
  const styles = {
    wrapper: {
      marginTop: "40px",
    },
    title: {
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      alignItems: "baseline",
      justifyItems: "left",
      gap: "20px",
    },
    hhTitle: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      alignItems: "baseline",
      justifyItems: "left",
      gap: "20px",
    },
    count: {},
    hh: {},
    hhCount: {},
    hhStatTitle: {},
    hhStatCount: {},
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        <Tag color="grey" size="m">
          {products && products.length}
        </Tag>
        <span>Сортировка</span>
      </div>
      <div>
        {products && products.map((p) => <div key={p._id}>{p.title}</div>)}
      </div>
      <div style={styles.hhTitle}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>
      {firstCategory === TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
      {page.advantages && page.advantages.length && (
        <Htag tag="h2">Приемущества</Htag>
      )}
    </div>
  );
};
