import { FC } from 'react';
import { Result } from '../../interfaces';
import { Card, Grid, Row, Text, Col } from '@nextui-org/react';
import { useRouter } from 'next/router';


interface Props {
    result: Result;
}

export const PokemonCard: FC<Props> = ({ result }) => {

    const router = useRouter();

    // SET ROUTER TO POKEMON DETAIL VIEW
    const onClick = () => {
        router.push(`/pokemon/${ result.name }`);
    }

    // CHANGE ID OF POKEMON TO CORRECT FORMAT (#XYZ)
    var resultId: string = "";
    if ((result.id).toString().length == 1) {
        resultId = "00" + (result.id).toString();
    } else if ((result.id).toString().length == 2) {
        resultId = "0" + (result.id).toString();
    } else {
        resultId = "" + (result.id).toString();
    }

    return (
        <Grid xs={6} sm={3} md={4} xl={3} key={result.id}>
            <Card isHoverable isPressable onClick={ onClick }>
                <Card.Body css={{ p: 1 }}>
                    <Card.Image
                        src={result.img}
                        width="100%"
                        height={140}
                    />
                </Card.Body>
                <Card.Footer
                    css={{
                        position: "static",
                        bottom: 0,
                        zIndex: 1,
                    }}
                >
                    <Row>
                        <Col>
                            <Text size={14} weight="bold" css={{ color:"#626262" }}>
                                #{ resultId }
                            </Text>
                            <Text size={25} transform="capitalize" weight="bold">
                                { result.name }
                            </Text>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    )
};