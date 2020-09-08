import * as React from 'react';
import { User } from '../models/data/user.model';

import '../styles/card.styles.scss';

interface Props {
  gnome: User;
}

function Card(props: Props) {
  const { } = props;

  return (
    <div key={props.gnome.id} className="profile p-2 p-md-3 my-2 my-md-3 my-lg-4">
      <div className="profile__field-container p-1">
        <div className="profile__field">{props.gnome.name},</div>
        <div className="profile__field">Age: {props.gnome.age}</div>
        <div className="profile__field">Professions</div>
        <div className="profile__field--professions">
          {props.gnome.professions.map((profession) => getProfessionSvg(profession, props.gnome.id))}
        </div>
      </div>
      <div className="profile__image-container p-1">
        <div className="profile__frame">
          <img className="profile__image" src={props.gnome.thumbnail} alt="profile-picture" />
        </div>
      </div>
    </div>
  );
}

function getTooltip(ProfessionName: string) {
  return (
    <span className="profession__tooltip p-1">{ProfessionName}
      <svg className="profession__tooltip--dialog-triangle" width="20" height="10">
        <polygon points="0,0 20,0 10,10" fill="black" />
      </svg>
    </span>
  );
}

function getProfessionSvg(ProfessionName: string, id: number) {
  const letters = ProfessionName.split('');
  const initials = letters[0] + letters[1];
  return (
    <div key={ProfessionName + '-' + id} className="profession m-1">
      {getTooltip(ProfessionName)}
      <svg width="30px" height="30px">
        <circle r="15px" cx="15" cy="15px" fill="black"></circle>
        <text x="50%" y="70%" textAnchor="middle" fontFamily="impact" fontSize="14px" fill="white">{initials}</text>
      </svg>
    </div>
  );
}

export default Card;
