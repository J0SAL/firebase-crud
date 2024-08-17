import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

function MovieCard({ movie }) {
    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <Card className="h-100 shadow-sm">
            {loading ? (
                <Skeleton height={200} />
            ) : (
                <Card.Img
                    variant="top"
                    src={movie.image}
                    onLoad={handleImageLoad}
                    style={{ display: loading ? 'none' : 'block' }}
                />
            )}
            <Card.Body>
                {loading ? (
                    <>
                        <Skeleton width={100} count={2} />
                    </>
                ) : (
                    <>
                        <Card.Title>{movie.name}</Card.Title>
                        <Button
                            variant="primary"
                            href={movie.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View More
                        </Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}

export default MovieCard;