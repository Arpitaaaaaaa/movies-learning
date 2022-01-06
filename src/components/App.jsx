import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import axios from "axios";

import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";

import styled from "styled-components";
import api from "./api";
import EditForm from "./EditForm";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [startEdit, setStartEdit] = useState(false);
  const [id, setId] = useState();

  const { register, formState: handleSubmit, reset } = useForm();

  const onSubmit = async (values) => {
    const res = await api.post("/", {
      title: values.title,
      popularity: +values.popularity,
    });

    setMovies([...movies, res.data]);
    reset();
    console.log(res);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/");
      setMovies(res.data);
    };

    fetchData();
  }, []);

  /* useEffect(() => {
    // DELETE request using axios with async/await
    async function deleteHandler() {
        const res = await axios.delete(`http://localhost:4000/movies/${movies.id}`);
        setMovies(res.data);
    }

    deleteHandler();
}, []); */

  const deleteItem = async (id) => {
    const newMovies = [...movies];
    await axios.delete(`http://localhost:4000/movies/${id}`);
    setMovies(newMovies.filter((movis) => movis.id !== id));
  };

  const putHandler = async (id) => {
    setStartEdit(true);
    setId(id);
  };

  /* 
  setItem((oldValues) => {
      return oldValues.filter((arrElmnts, i) => {
        return id !== i;
      });
 const deleteItem = (id) => {
   console.log(id)
 }; */

  return (
    <div>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">
          Title
          <input
            id="title"
            placeholder="Enter a title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 4,
                message: "Title is too short",
              },
            })}
          />
        </label>
        <label htmlFor="popularity">
          Popularity
          <input
            id="title"
            placeholder="Enter it's popularity"
            type="number"
            {...register("popularity", {
              required: "Popularity is required",
              min: {
                value: 1,
                message: "Popularity cannot be less than 1",
              },
            })}
          />
        </label>
        <button>Create Movie</button>
      </StyledForm>

      <StyledHeading>Movies</StyledHeading>
      <StyledContainer>
        {movies.map((movie) => (
          <StyledCard key={movie.id}>
            <h4>{movie.title}</h4>
            <p>Popularity: {movie.popularity}</p>

            <button onClick={() => putHandler(movie.id)}>
              <FiEdit />
            </button>
            <button onClick={() => deleteItem(movie.id)}>
              {" "}
              <FaTrashAlt />
            </button>
          </StyledCard>
        ))}
      </StyledContainer>
      {startEdit && <EditForm id={id} movies={movies} setMovies={setMovies} />}
    </div>
  );
};

export default App;

const StyledHeading = styled.h2`
  margin-bottom: 2rem;
`;

const StyledContainer = styled.div`
  display: flex;
`;

const StyledCard = styled.div`
  padding: 2rem;
  background-color: #cddee4;
  margin: 1rem;
  border-radius: 10px;

  h4 {
    color: purple;
  }

  p {
    font-size: 1rem;
  }

  button {
    margin-right: 1rem;
    padding: 1rem;
    margin-top: 1rem;
    color: red;
    border: 2px solid black;
    cursor: pointer;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  padding: 2rem;

  label {
    margin-bottom: 1rem;
  }

  input {
    font-size: 1.2rem;
    display: block;
    width: 100%;
  }

  button {
    width: fit-content;
    padding: 0.5rem 2rem;
    font-size: 1.3rem;
    background: #4d014d;
    color: white;
    border: none;
    cursor: pointer;
  }
`;
