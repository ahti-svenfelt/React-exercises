import { create } from 'zustand';

interface Movie {
  id: number;
  title: string;
  watched: boolean;
}

interface MovieStore {
    movies: Movie[];
    toggleWatched: (id: number) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
    movies: [
        { id: 1, title: "Inception", watched: false },
        { id: 2, title: "The Matrix", watched: true },
        { id: 3, title: "Interrstellar", watched: false },
        { id: 4, title: "The Dark Knight", watched: true },
    ],

    toggleWatched: (id) =>
        set((state) => ({
            movies: state.movies.map((movie) =>
                movie.id === id ? { ...movie, watched: !movie.watched } : movie
            ),
        })),
}));