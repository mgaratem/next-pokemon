import { Card, Container, Row, Col, Image, Text, Spacer, Table, Button, Link } from '@nextui-org/react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import NextLink from 'next/link';
import { pokeApi } from '../../api';
import { Layout }  from '../../components/layouts';
import { Pokemon, PokemonSpecies, PokemonTypes, PokemonListResponse } from '../../interfaces';


interface Props {
    pokemon: Pokemon;
    species: PokemonSpecies;
    types: PokemonTypes;
}

const PokemonPage: NextPage<Props> = ({ pokemon, species, types }) => {

    // CHANGE ID OF POKEMON TO CORRECT FORMAT (#XYZ)
    var pokemonId: string = "";
    if ((pokemon.id).toString().length == 1) {
        pokemonId = "00" + (pokemon.id).toString();
    } else if ((pokemon.id).toString().length == 2) {
        pokemonId = "0" + (pokemon.id).toString();
    } else {
        pokemonId = "" + (pokemon.id).toString();
    }

    
    return (
        <Layout>
            <Container justify="center" css={{ display: 'flex', alignItems:'center', justifyContent:'center', marginTop: "50px", marginBottom: "50px"}}>
                <Text h2 transform="capitalize">{ pokemon.name } #{ pokemonId }</Text>
            </Container>
            <Spacer></Spacer>
            <Container>
                <Row>
                    <Col>
                        <Image
                            showSkeleton
                            src={ pokemon.sprites.other?.["official-artwork"].front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ pokemon.id }.png` }
                            alt={ pokemon.name }
                            maxDelay={10000}
                            width={430}
                            height={400} 
                        />
                    </Col>
                    <Col>
                        <Text size={18} weight="bold">
                            { species.flavor_text_entries[15].flavor_text }
                        </Text>
                        <Spacer />
                        <Card variant="flat" css={{ p: "$6", mw: "420px", backgroundColor: "#30a7d7"}}>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Text weight="bold" color="white">Height</Text>
                                        <Text size={20}>
                                            { (pokemon.height*0.1).toFixed(1) } m
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text weight="bold" color="white">Weight</Text>
                                        <Text size={20}>
                                        { (pokemon.weight*0.1).toFixed(1) } kg
                                        </Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Text weight="bold" color="white">Abilities</Text>
                                </Row>
                                <Row>
                                    { pokemon.abilities.map((ability, i) => 
                                        <Col key={i}>
                                            <Text size={20} transform="capitalize">
                                                { ability.ability?.name }
                                            </Text>
                                        </Col> 
                                    )}
                                </Row>
                            </Card.Body>
                        </Card>
                        <Spacer />
                        <Text weight="bold">Type</Text>
                        <Row>
                            { pokemon.types.map((type, i) => 
                                <Col key={i}>
                                    <Card variant="flat" css={{ mw: "200px" }}>
                                        <Card.Body>
                                            <Text size={20} transform="capitalize">
                                                { type.type?.name }
                                            </Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                        <Spacer />
                        <Text weight="bold">Weakness</Text>
                        <Row>
                            { types.damage_relations.double_damage_from.map((from, i) => 
                                <Col key={i}>
                                    <Card variant="flat" css={{ mw: "200px" }}>
                                        <Card.Body>
                                            <Text size={20} transform="capitalize">
                                                { from.name }
                                            </Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
                <Spacer />
                <Row>
                    <Card variant="flat" css={{ p: "$6", mw: "600px", backgroundColor: "#a4a4a4"}}>
                        <Card.Body>
                            <Text size={17} transform="capitalize" weight="bold">
                                Stats
                            </Text>
                            <Table
                                compact
                                shadow={false}
                                css={{ minWidth: "100%", height: "auto" }}
                                color="secondary"
                                aria-label="Puntos Base"
                                >
                                <Table.Header>
                                    <Table.Column>Name</Table.Column>
                                    <Table.Column>Stats</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                { pokemon.stats.map((stats, i) => 
                                    <Table.Row key={ i+1 }>
                                        <Table.Cell><Text transform="capitalize">{ stats.stat?.name}</Text></Table.Cell>
                                        <Table.Cell>{ stats.base_stat}</Table.Cell>
                                    </Table.Row>
                                )}
                                </Table.Body>
                            </Table>
                        </Card.Body>
                    </Card>
                </Row>
                <Spacer />
                <Container justify="center" css={{ display: 'flex', alignItems:'right', justifyContent:'right', paddingBottom: "50px"}}>
                    <NextLink href="/" passHref>
                        <Link>
                            <Button size="xl" color="warning" auto>
                                Go back to Pokédex
                            </Button>
                        </Link>
                    </NextLink>
                </Container>
            </Container>
        </Layout>
    )
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    // GET PATHS BASED ON NAME OF POKEMONS
    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon/?limit=151`)
    const pokemonNames: string[] = data.results.map( pokemon => pokemon.name);

    return {
        paths: pokemonNames.map( name => ({ 
            params: { name }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    
    const { name } = params as { name: string };

    // GET GENERAL INFO OF A POKEMON: DETAILS OF POKEMON, SPECIES & TYPES
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ name }`)
    const { data: speciesData } = await pokeApi.get<PokemonSpecies>(`/pokemon-species/${ data.id }`)
    const { data: typesData } = await pokeApi.get<PokemonTypes>(`/type/${ data.types[0].type.name }`)

    const pokemon = {
        id:data.id,
        name: data.name,
        sprites: data.sprites,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities,
        types: data.types,
        stats: data.stats,
    }

    const species = {
        flavor_text_entries: speciesData.flavor_text_entries,
    }

    const types = {
        damage_relations: typesData.damage_relations,
    }

    return {
        props: {
            pokemon,
            species,
            types
        },
    };
};


export default PokemonPage;
