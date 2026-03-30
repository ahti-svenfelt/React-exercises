import React, { useState } from 'react';
import { useMovieStore } from '../store/useMovieStore';

const MovieList = () => {
    const movies = useMovieStore((state) => state.movies);
    const toggleWatched = useMovieStore((state) => state.toggleWatched);
    
    const [filterType, setFilterType] = useState<'all' | 'watched' | 'unwatched'>('all');
    let filteredMovies = movies;

    if(filterType === "watched") {
        filteredMovies = movies.filter((m) => m.watched);
    } else if (filterType === "unwatched") {
        filteredMovies = movies.filter((m) => !m.watched);
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Movie Library</h2>

            <div className="flex gap-3 mb-6">
                <button onClick={() => setFilterType("all")}
                    className={`px-4 py-2 rounded ${
                        filterType === "all"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                All</button>
                <button onClick={() => setFilterType("watched")}
                    className={`px-4 py-2 rounded ${
                        filterType === "watched"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                Watched</button>
                <button onClick={() => setFilterType("unwatched")}
                    className={`px-4 py-2 rounded ${
                        filterType === "unwatched"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                Unwatched</button>
            </div>

            <ul className="space-y-4">
                {filteredMovies.map((movie) => (
                    <li key={movie.id}
                        className="flex items-center justify-between p-4 bg-white shadow rounded"
                    >
                        <p className="font-semibold">{movie.title}</p>
                        <p className={`text-sm ${
                                movie.watched ? "text-green-600" : "text-red-600"
                            }`}
                        >
                            {movie.watched ? "Watched" : "Not Watched"}</p>
                        <button
                            onClick={() => toggleWatched(movie.id)}
                            className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Toggle
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MovieList;