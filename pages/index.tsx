import type { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import { Grid, Button, Spacer, Container } from '@nextui-org/react';

import { pokeApi } from '../api';
import { Layout }  from '../components/layouts';
import { PokemonListResponse, Result } from '../interfaces';
import { PokemonCard } from '../components/pokemon';

interface Props {
  results: Result[];
}

const Home: NextPage<Props> = ({ results }) => {
  
  // PAGINATION
  const [ currentPage, setCurrentPage ] = useState(0);
  const filteredPokemons = (): Result[] => {
    return results.slice (0, currentPage + 12);
  }
  const nextPage = () => {
    setCurrentPage (currentPage + 12);
  }

  return (
    <Layout>
      
      <Grid.Container gap={ 3 } justify='flex-start'>
        {
          filteredPokemons().map( ( result ) => (
            <PokemonCard key={ result.id } result={result} />
          ))
        }
      </Grid.Container>

      <Container justify="center" css={{ display: 'flex', alignItems:'center', marginTop: "50px", marginBottom: "50px"}}>
        <Button size="xl" onClick = { nextPage } >
          Load More Pokémon 
        </Button>
      </Container>
      <Spacer></Spacer>

    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async (ctx) => {

  // GET POKEMONS ARRAY DATA FROM API
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  const results: Result[] = data.results.map(( pokemon, i) => ({
    ...pokemon,
    id: i+1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ i+1 }.png`
  }))

  return {
    props: {
      results
    },
  };
};

export default Home
