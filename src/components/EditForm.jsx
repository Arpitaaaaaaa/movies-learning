import axios from "axios";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const EditForm = (props) => {
  const movie = props.movies.find((movie) => movie.id === props.id);
  const { register, handleSubmit } = useForm({
    defaultValues: { title: movie.title, popularity: movie.popularity },
  });

  const onSubmit = async (values) => {
    const newMovies = [...props.movies];
    const res = await axios.put(
      `http://localhost:4000/movies/${props.id}`,
      values
    );
    const updatedMovieList = newMovies.map((movies) => {
      if (movies.id === props.id) {
        return res.data;
      }

      return movies;
    });
    console.log(updatedMovieList);
    props.setMovies(updatedMovieList);
  };

  return (
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
  );
};

export default EditForm;

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
