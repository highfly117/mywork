import React from "react";
import TopBarFitness from "./TopBarFitness";
import "../CSS/Fitness/FitnessQuest.css"

const FitnessQuest = () => {

    return (
        <div className="FitnessQuest">
          

            <div className="FitnessPanel">
                <div className="inputInfoWrapper">
                <TopBarFitness />

                    <div className="inputPanel">
                        <img className="inputPanel-img" src="" alt=""></img>
                        <div className="level-info">
                            <h5>Level 69</h5>
                            <h5>666 XP to Level 70</h5>
                        </div>
                        <div className="LVLbar">
                            <div className="LVLprogress" ></div>
                        </div>
                        <div className="FriendsWrapper">
                           <h5>0 Friends</h5> 
                           <h5>See All</h5>
                        </div>
                        <p>I don't have any Friends</p>
                        <div className="AchivementsWrapper">
                           <h5>0 Achievements</h5> 
                           <h5>See All</h5>
                        </div>
                        <p>I don't have any Achievements</p>
                        <div className="GroupsWrapper">
                           <h5>0 Groups</h5> 
                           <h5>See All</h5>
                        </div>
                        <p>I don't have any Groups</p>
                    </div>
                    <div className="infoPanel">
                        <div className="UserNameBar">
                            <h4 className="UserName"><strong>Highfly117</strong></h4>
                            <h4 className="Level"><strong>69</strong> Level</h4>
                        </div>
                        <div className="Tabselection">
                            <h5 style={{marginBottom:"0px"}}>Feed</h5>
                        </div>
                        <div className="InputWrapper">
                            <form>
                                <input placeholder="Add exercise here." className="form-control">
                                
                                </input>

                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FitnessQuest
