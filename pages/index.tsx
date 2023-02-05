import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import HomeHero from '../components/home/HomeHero';
import HomeMatches from '../components/home/HomeMatches';
import HomeSponsors from '../components/home/HomeSponsors';
import HomeTeam from '../components/home/HomeTeam';
import { IHomePage } from '../components/home/Interfaces';
import Layout from '../components/shared/Layout';
import { TBESponsor } from '../components/sponsors/Interfaces';
import { TBETeamPlayer, TTeamPlayer } from '../components/team/Interfaces';
import { getFirstFutureMatch, getFirstLatestMatch } from '../services/Match.service';
import { getAllSponsors } from '../services/Sponsors.service';
import { getAllPlayers } from '../services/Team.service';
import { getHTMLRankingPage } from './matches/ranking';

const HomePage: NextPage<IHomePage> = ({ data }) => {
  const { futureMatch, latestMatch, sponsors, team, ranking } = data;

  return (
    <Layout {...{ isUsedOnOverlay: true, bgColor: 'var(--grey-alpha-50)' }}>
      <HomeHero {...{ ranking }} />
      <HomeMatches {...{ futureMatch, latestMatch }} />
      <HomeTeam {...{ team }} />
      <HomeSponsors {...{ sponsors }} />
    </Layout>
  );
};
export default HomePage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    const { data: sponsors } = await getAllSponsors();
    const { data: team } = await getAllPlayers();
    const { data: latestMatch } = await getFirstLatestMatch();
    const { data: futureMatch } = await getFirstFutureMatch();
    const data = await getHTMLRankingPage();

    const ranking = [data[0], data[1], ...data.filter(({ club }) => club.toLowerCase().includes('suceava'))];

    return {
      props: {
        session,
        data: {
          sponsors: sponsors?.map(({ image_url, title, website }: TBESponsor) => ({ logo: image_url, title, site: website })),
          team: team?.map(
            ({ image, first_name, last_name, position, shirtNumber, id }: TBETeamPlayer) =>
              ({
                image,
                name: first_name,
                surName: last_name,
                position,
                shirtNumber,
                id,
              } as TTeamPlayer)
          ),
          futureMatch: { ...futureMatch, scoreClubOne: futureMatch.score_first, scoreClubTwo: futureMatch.score_second },
          latestMatch: { ...latestMatch, scoreClubOne: latestMatch.score_first, scoreClubTwo: latestMatch.score_second },
          ranking,
        },
      },
    };
  } catch (e) {
    return {
      props: {
        session: {},
        data: {
          sponsors: [],
          team: [],
          futureMatch: {},
          latestMatch: {},
          ranking: [],
        },
      },
    };
  }
};
