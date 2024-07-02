import React, { useEffect, useState } from 'react';
import axios from "axios"
export const ListAllPeople = () => {
    const [peoples, setPeoples] = useState([])
    const [first_name, setFirstName] = useState('')
    const [middle_name, setMiddleName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const [dob, setDob] = useState('')
    const [is_male, setIsMale] = useState(false)
    const [editingPerson, setEditingPerson] = useState(null);
    const [loading, setLoading] = useState("");
    const [searchPerson, setSearchPerson] = useState('');
    useEffect(() => {
        readPeople()
        if (editingPerson) {
            setFirstName(editingPerson.first_name)
            setMiddleName(editingPerson.middle_name)
            setLastName(editingPerson.last_name)
            setEmail(editingPerson.email)
            setDescription(editingPerson.description)
            setDob(editingPerson.dob)
            setIsMale(editingPerson.is_male)
        }
    }, [editingPerson])
    const readPeople = () => {
        axios.get('https://sendmail.iconsjo.space/REST/ppl').then((res) => {
            localStorage.setItem('people', JSON.stringify(res.data.data));
            setPeoples(res.data.data)
        })
    }
    const createPerson = () => {
        let data = { first_name: first_name, middle_name: middle_name, last_name: last_name, email: email, description: description, dob: dob, is_male: is_male }
        axios.post('https://sendmail.iconsjo.space/REST/ppl', data).then((res) => {
            readPeople()
        })
    }
    const updatePerson = () => {
        let data = { first_name: first_name, middle_name: middle_name, last_name: last_name, email: email, description: description, dob: dob, is_male: is_male }
        axios.put(`https://sendmail.iconsjo.space/REST/ppl?id=${editingPerson.id}`, data).then((res) => {
            readPeople()
        })
    }
    const deletePerson = (id) => {
        if (window.confirm('Delete the person ?')) {
            axios.delete(`https://sendmail.iconsjo.space/REST/ppl?id=${id}`).then((res) => {
                readPeople()
            })
        }

    }
    const handleCheckboxChange = () => {
        setIsMale(!is_male);
    };
    const handleSubmit = () => {
        setLoading(true)
        if (editingPerson) {
            updatePerson()
            setLoading(false)
        } else {
            createPerson()
            setLoading(false)
        }
    }

    const handleSearch = () => {
        const filteredPeople = peoples.filter(person =>
            person.first_name.toLowerCase().includes(searchPerson.toLowerCase()) ||
            person.last_name.toLowerCase().includes(searchPerson.toLowerCase()) ||
            person.email.toLowerCase().includes(searchPerson.toLowerCase())
        );
        setPeoples(filteredPeople);
    };
    return (
        <div className="container-fluid mt-2">
            <div className="row">
                <div className="col-md-8 mb-2">
                    <div className='card p-2'>
                        <div className="table-responsive">
                            <div className='mb-3'>
                                <div className="input-group mb-4">
                                    <input type="text" className="form-control" value={searchPerson}
                                        onChange={(e) => setSearchPerson(e.target.value)}
                                        placeholder="Search by first name, last name, or email..." />
                                    <button className="input-group-text btn btn-primary" id="basic-addon2" onClick={handleSearch}>Search</button>
                                </div>

                            </div>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Middle Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Description</th>
                                        <th>Date Of Birth</th>
                                        <th>Gender</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {peoples && peoples.map((row) => {
                                        return <tr key={row.id} >
                                            <td>{row.first_name}</td>
                                            <td>{row.middle_name}</td>
                                            <td>{row.last_name}</td>
                                            <td>{row.email}</td>
                                            <td>{row.description}</td>
                                            <td>{new Date(`${row.dob}`).toLocaleDateString()}</td>
                                            <td>{row.is_male ? 'Male' : 'Not Male'}</td>
                                            <td>
                                                <button className="btn btn-primary btn-sm me-1" onClick={() => setEditingPerson(row)} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" ><i className="bi bi-eye"></i></button>
                                                <button className="btn btn-warning btn-sm me-1" onClick={() => setEditingPerson(row)}  ><i className="bi bi-pencil-fill"></i></button>
                                                <button className="btn btn-danger btn-sm " onClick={() => deletePerson(row.id)}  ><i className="bi bi-trash"></i></button>

                                            </td>
                                        </tr>
                                    })}


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3 mb-3">
                        <h3 className="mb-4 fs">{editingPerson ? 'Edit Person' : 'Create Person'}</h3>
                        <div className="form-group">
                            <label className='pb-2 pt-2'>First Name</label>
                            <input type="text" className="form-control" placeholder='Enter Your First Name' id="first_name" name="first_name" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className='pb-2 pt-2'>Middle Name</label>
                            <input type="text" className="form-control" placeholder='Enter Your Middle Name' id="middle_name" name="middle_name" value={middle_name} onChange={(e) => setMiddleName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className='pb-2 pt-2'>Last Name</label>
                            <input type="text" className="form-control" placeholder='Enter Your Last Name' id="last_name" name="last_name" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className='pb-2 pt-2'>Last Name</label>
                            <input type="email" className="form-control" placeholder='Enter Your Email' id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group" >
                            <label className='pb-2 pt-2'>Description</label>
                            <textarea type="text" className="form-control" placeholder='Enter Your Description' id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label className='pb-2 pt-2'>Date Of Birth</label>
                            <input type="date" className="form-control" id="dob" name="dob" max={dob} min={dob} value={dob} onChange={(e) => setDob(e.target.value)} />
                        </div>
                        <div className="form-group pb-2 pt-2">

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={is_male}
                                    onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    is male
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit} >
                            {loading ? (
                                <div className="spinner-border spinner-border-sm text-light" role="status"></div>
                            ) : (
                                editingPerson ? (
                                    <><i className="bi bi-pencil-fill"></i> Update Person</>
                                ) : (
                                    <><i className="bi bi-plus-circle-fill"></i> Create Person</>
                                )
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Personal information</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-2">
                                <label className='pb-2 pt-2'>First Name</label>
                                <input type="text" className="form-control" placeholder='Enter Your First Name' id="first_name" name="first_name" value={first_name} disabled />
                            </div>
                            <div className="mb-2">
                                <label className='pb-2 pt-2'>Middle Name</label>
                                <input type="text" className="form-control" placeholder='Enter Your Middle Name' id="middle_name" name="middle_name" value={middle_name} disabled />
                            </div>
                            <div className="mb-2">
                                <label className='pb-2 pt-2'>Last Name</label>
                                <input type="text" className="form-control" placeholder='Enter Your Middle Name' id="last_name" name="last_name" value={last_name} disabled />
                            </div>
                            <div className="mb-2">
                                <label className='pb-2 pt-2'>Email</label>
                                <input type="text" className="form-control" placeholder='Enter Your Middle Name' id="email" name="email" value={email} disabled />
                            </div>
                            <div className="mb-2">
                                <label className='pb-2 pt-2'>Description</label>
                                <textarea type="text" className="form-control" placeholder='Enter Your Description' id="description" name="description" value={description} disabled />
                            </div>
                            <div className="mb-2">
                                <label className='pb-2 pt-2'>Date Of Birth</label>
                                <input type="text" className="form-control" id="dob" name="dob" max={dob} min={dob} value={dob} disabled />
                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

