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
import { getAllSponsors } from '../services/Sponsors.service';
import { getAllPlayers } from '../services/Team.service';
// TO-DO: Un comment after updating DB
// import { getFirstFutureMatch, getFirstLatestMatch } from '../services/Match.service';
// import { getHTMLRankingPage } from './matches/ranking';

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
    const { data: _sponsors } = await getAllSponsors();
    const sponsors = _sponsors?.map(({ image_url, title, website }: TBESponsor) => ({ logo: image_url, title, site: website }));
    const { data: _team } = await getAllPlayers();
    const team = _team?.map(
      ({ image, first_name, last_name, position, shirtNumber, id }: TBETeamPlayer) =>
        ({
          image,
          name: first_name,
          surName: last_name,
          position,
          shirtNumber,
          id,
        } as TTeamPlayer)
    );

    // TO-DO: Un comment after updating DB
    // const { data: latestMatch } = await getFirstLatestMatch();
    // const { data: futureMatch } = await getFirstFutureMatch();

    // const _ranking = await getHTMLRankingPage();
    // const ranking = [_ranking[0], _ranking[1], ..._ranking.filter(({ club }) => club.toLowerCase().includes('suceava'))];

    return {
      props: {
        session,
        data: {
          sponsors,
          team,
          // TO-DO: Un comment after updating DB
          // futureMatch: { ...futureMatch, scoreClubOne: futureMatch.score_first, scoreClubTwo: futureMatch.score_second },
          // latestMatch: { ...latestMatch, scoreClubOne: latestMatch.score_first, scoreClubTwo: latestMatch.score_second },
          // ranking
          futureMatch: {},
          latestMatch: {},
          ranking: [],
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
