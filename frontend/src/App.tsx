import { useFormik } from 'formik';
import React from 'react';
import { useQuery } from 'react-query';
import { AddToDo, completeToDo, deleteToDo, getTodos } from './services/todoServices';

const App = () => {
    const { data, isLoading, isError } = useQuery('todos', getTodos);
    const formik = useFormik({
        initialValues: {
            title: '',
        },
        onSubmit: (values) => {
            AddToDo(values.title);
        },
    });

    const submitAddToDo = (id: number) => {
        completeToDo(id);
    };

    const submitDeleteToDo = (id: number) => {
        deleteToDo(id);
    };

    return (
        <div className={'container'}>
            <div className={'row mt-5'}>
                <h1>ToDo App</h1>
                <div className={'col-12 col-lg-4 mb-4'}>
                    <form
                        className={'card p-3'}
                        onSubmit={formik.handleSubmit}
                        action=""
                    >
                        <div className={'card-body mb-3'}>
                            <label className={'card-title form-label mb-3'}>
                                NEW
                            </label>
                            <input
                                type="text"
                                id={'title'}
                                onChange={formik.handleChange}
                                value={formik.values.title}
                                className={'form-control'}
                                placeholder={'Resume...'}
                            />
                        </div>
                        <button className={'btn btn-primary'} type="submit">
                            Create
                        </button>
                    </form>
                </div>
                <div className={'col-12 col-lg-8'}>
                    {isLoading || isError ? (
                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <div className={'row'}>
                            {data.map((todo: any, index: number) => {
                                let buttonStyle = 'btn btn-warning';
                                let cardStyle = 'card';

                                if (todo.completed === true) {
                                    buttonStyle += ' disabled';
                                    cardStyle += ' bg-success';
                                }

                                return (
                                    <div
                                        key={index}
                                        className={'col-md-6 mb-4'}
                                    >
                                        <div className={cardStyle}>
                                            <div className={'card-body'}>
                                                <h5 className={'card-title'}>
                                                    {todo.title}
                                                </h5>
                                                <div className={'d-flex justify-content-evenly'}>
                                                    <button
                                                        className={buttonStyle}
                                                        onClick={() =>
                                                            submitAddToDo(
                                                                todo.id
                                                            )
                                                        }
                                                    >
                                                        {todo.completed
                                                            ? 'Completed'
                                                            : 'Complete'}
                                                    </button>
                                                    <button
                                                        className={
                                                            'btn btn-danger'
                                                        }
                                                        onClick={() =>
                                                            submitDeleteToDo(
                                                                todo.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
