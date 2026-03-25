import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { fetchMovies } from '../lib/apis';
import useHttp from '../hooks/useHttp';
import {Col , Spin, Row} from 'antd';
import MovieCard from '../components/MovieCard';

const AllMovies=()=>{
    
   const {isLoading ,data,error,sendRequest}= useHttp(fetchMovies , true);
  
    useEffect(()=>{
       sendRequest();
    },[]);
   
 return(
    <div
    style={{
      padding:'24px 24px 24px 24px',
      maxWidth:'100vw',
      margin :'0 auto',
    }}>
      
      
     {isLoading && 
     (<div style={{ textAlign:'center' ,padding:48}}>
      <Spin size="large" />
      </div>)}
      
    {data && (
        <Row gutter={[16, 24]}>
          {data.payload.map((movie) => (
            <Col key={movie._id} xs={24} sm={12} md={8} lg={6}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      )}
    </div>
 )
}


export default AllMovies;