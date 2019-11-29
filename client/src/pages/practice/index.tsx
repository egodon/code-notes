import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AppContainer from '@components/layout/AppContainer';
import PracticeCard from '@components/PracticeCard';
import Categories from '@components/Categories';
import Button from '@components/Button';
import { PracticeCard as IPracticeCard } from '@interfaces';
import { withApollo } from '@lib/apollo';
import { ROUTES } from 'constants/routes';

export const ALL_PRACTICE_CARDS_QUERY = gql`
  {
    practiceCards {
      id
      category
      question
      answer
    }
  }
`;

/**
 * @todo: handle request error
 */
const PracticeHome: NextPage = () => {
  const [hidden, setHidden] = useState<Set<string | -1>>(new Set());
  const { loading, error, data } = useQuery(ALL_PRACTICE_CARDS_QUERY);
  const router = useRouter();
  const categoryFilter = router.query.category;

  function hideCard(id: string) {
    setHidden(new Set(hidden).add(id));
  }

  return (
    <PracticeContainer>
      <Categories />
      <PracticeCards>
        {loading
          ? null
          : data.practiceCards
              .filter((card: IPracticeCard) => !hidden.has(card.id))
              .filter((card: IPracticeCard) =>
                categoryFilter ? card.category === categoryFilter : true
              )
              .map((card: IPracticeCard) => (
                <PracticeCard
                  practiceCard={card}
                  key={card.id}
                  hideCard={hideCard}
                />
              ))}
      </PracticeCards>
      <Link href={ROUTES.PRACTICE.ADD}>
        <AddButton as="a">Add Card</AddButton>
      </Link>
    </PracticeContainer>
  );
};

export const PracticeContainer = styled(AppContainer)`
  display: grid;
  grid-template-columns: 14.5rem 1fr 14.5rem;
`;

const PracticeCards = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const AddButton = styled(Button)``;

export default withApollo(PracticeHome);
