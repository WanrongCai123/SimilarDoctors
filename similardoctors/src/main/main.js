import React from "react";
const doctors = require('../data/doctor.json').doctors;
const CreateDoctor = ({doctorState, doctor}) => {
    return (
        <div>
            <img src={doctor.photo} className="images" style={{maxWidth:150, height:'auto'}}/>

            <div><b>{doctor.name}</b></div>
            <div>Location: {doctor.location}</div>
            <div>Specialty: {doctor.specialty}</div>
            <div>Score: {doctor.score}</div>
            <div>Find Similar Doctor<input type="checkbox" value="Select Doctor"  onChange={() => {
                selectDoctor(doctorState, doctor)}
            }>
            </input></div>
        </div>
    )
}

const CreateSimilarDoctor = ({doctorState, doctor}) => {
    return (
        <div>
            <img src={doctor.photo} className="images" style={{maxWidth:150, height:'auto'}}/>

            <div><b>{doctor.name}</b></div>
            <div>Location: {doctor.location}</div>
            <div>Specialty: {doctor.specialty}</div>
            <div>Score: {doctor.score}</div>
        </div>
    )
}

const selectDoctor = (doctorState, doctor) => {
    console.log(doctorState)
    var appeared = false;
    var selected = false;
    var deleted = false;
    doctorState.state.similardoctors.map((element) => {
        if (element.id === doctor.id) {
            selected = true;
        }
    })
    doctorState.state.similardoctors.map((element) => {
        if (element.specialty === doctor.specialty) {
            appeared = true;
            
        }
        if (element.specialty === doctor.specialty && element.id !== doctor.id ) {
            deleted = true;
        }
    })
    var newDoctorList = []
    
    // console.log(selected);
    if (appeared === false) {
        doctorState.setState({
            ...doctorState.state,
            similardoctors: doctorState.state.similardoctors.concat(
                doctorState.state.doctors.filter((element) => element.specialty === doctor.specialty)
            )
        });
    }
    else if (deleted === true && selected === true){
        doctorState.setState({
            ...doctorState.state,
            similardoctors: doctorState.state.similardoctors.filter((element) => element.specialty !== doctor.specialty)
            // similardoctors:doctorState.state.doctors.filter((element) => element.specialty === doctor.specialty)
        });
    }

    
    
}
class Doctor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            doctors:doctors,
            similardoctors:[]
        }
        // console.log(this);
    }

    render () {
        return(
            
            <table>
                <tbody>
                    <tr>
                        <td>
                            <h1>The Most Popular Doctor</h1>
                        </td>
                        <td>
                            <h1>The Recommended Similar Doctor</h1>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            
                            {
                                this.state.doctors
                                .sort((doctor1,doctor2) => doctor2.score - doctor1.score)
                                .map((doctor) => {
                                    // console.log(this);
                                    return (
                                        <CreateDoctor key={doctor.id} doctorState={this} doctor={doctor} />
                                    )
                                })
                            }
                            
                        </td>
                        <td>
                            
                            {
                                this.state.similardoctors
                                .sort((doctor1,doctor2) => doctor2.score - doctor1.score)
                                .map((doctor) => {
                                    return (
                                        <CreateSimilarDoctor key={doctor.id} doctorState={this} doctor={doctor}/>
                                    )
                                })
                            }
                        </td>
                    </tr> 

                </tbody>
                </table>
        )
    }
}
export default Doctor;