import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card, Typography, Spin, Alert, Descriptions, Button, Space, Select, message } from 'antd';
import useHttp from '../hooks/useHttp';
import { fetchTheatreById, fetchMovies, addMovieToTheatre } from '../lib/apis';
import UserContext from '../context/user-context';

const { Title, Text } = Typography;

const TheatreDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(UserContext);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const { data, isLoading, error, sendRequest } = useHttp(fetchTheatreById, true);

  const {
    data: moviesData,
    isLoading: moviesLoading,
    error: moviesError,
    sendRequest: fetchMoviesRequest,
  } = useHttp(fetchMovies, true);

  const {
    data: addMovieData,
    isLoading: addMovieLoading,
    error: addMovieError,
    sendRequest: addMovieRequest,
  } = useHttp(addMovieToTheatre, false);

  useEffect(() => {
    if (id && isAuthenticated && user?.role === 'PARTNER') {
      sendRequest(id);
    }
  }, [id, isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'PARTNER') {
      fetchMoviesRequest();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (addMovieError) {
      message.error(addMovieError);
    }
  }, [addMovieError]);

  useEffect(() => {
    if (!addMovieLoading && addMovieData?.success) {
      message.success('Movie added to theatre successfully');
      setSelectedMovieId(null);
      sendRequest(id);
    }
  }, [addMovieData, id]);

  const addMovieToTheatreHandler = () => {
    if (!selectedMovieId) return;
    addMovieRequest({ movieId: selectedMovieId, theatreId: id }); 
  };

  // ✅ FIXED: safe theatre
  const theatre = data?.payload;

  // ✅ FIXED: handle different backend shapes
  const movies = Array.isArray(moviesData?.payload)
    ? moviesData.payload
    : Array.isArray(moviesData?.payload?.movies)
    ? moviesData.payload.movies
    : [];

  // ✅ FIXED: safe theatre movies
  const existingMovieIds = useMemo(() => {
    const theatreMovies = Array.isArray(theatre?.movies) ? theatre.movies : [];

    return new Set(
      theatreMovies
        .map((m) => (typeof m === 'object' ? m?._id : m))
        .filter(Boolean)
    );
  }, [theatre?.movies]);

  const moviesToAdd = useMemo(() => {
    return movies.filter((m) => !existingMovieIds.has(m._id));
  }, [movies, existingMovieIds]);

  useEffect(() => {
    if (selectedMovieId && existingMovieIds.has(selectedMovieId)) {
      setSelectedMovieId(null);
    }
  }, [selectedMovieId, existingMovieIds]);

  if (!isAuthenticated || user?.role !== 'PARTNER') {
    return (
      <div style={{ padding: '48px 24px', maxWidth: 800, margin: '0 auto' }}>
        <Card>
          <Title level={3}>Theatre Details</Title>
          <Text type="danger">You are not authorized to view this page.</Text>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px 0', maxWidth: 800, margin: '0 auto' }}>
      <Card>
        <Space style={{ width: '100%', marginBottom: 16, justifyContent: 'space-between' }}>
          <Title level={3} style={{ margin: 0 }}>
            Theatre Details
          </Title>
          <Button onClick={() => navigate('/theatres')}>Back</Button>
        </Space>

        {isLoading && <Spin />}

        {!isLoading && error && <Alert message={error} type="error" />}

        {!isLoading && !error && theatre && (
          <>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Name">{theatre.name}</Descriptions.Item>
              <Descriptions.Item label="Address">{theatre.address}</Descriptions.Item>
              <Descriptions.Item label="Capacity">{theatre.capacity}</Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 24 }}>
              <Title level={4}>Add Movie</Title>

              {/* ✅ FIXED: Alert prop */}
              {moviesError && (
                <Alert message={moviesError} type="error" style={{ marginBottom: 12 }} />
              )}

              <Space>
                <Select
                  showSearch
                  placeholder="Select a movie"
                  style={{ width: 300 }}
                  loading={moviesLoading}
                  value={selectedMovieId}
                  onChange={setSelectedMovieId}
                  // ✅ FIXED: better filter
                  options={moviesToAdd.map((movie) => ({
                    label: movie.title,
                    value: movie._id,
                  }))}
                />

                <Button
                  type="primary"
                  disabled={!selectedMovieId}
                  loading={addMovieLoading}
                  onClick={addMovieToTheatreHandler}
                >
                  Add Movie
                </Button>
              </Space>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default TheatreDetails;