import React ,{useCallback} from 'react';
import { MdCancel } from 'react-icons/md';
import { useTranslation } from 'react-i18next';


const Members = (props) => {


  const { t } = useTranslation();

  
  const handleMembers = useCallback(
    (value) => {
      props.setMembers(value);
    },
    [props.setMembers],
  );


  const handleRemoveMembers = (member) => {
    
    handleMembers(props.members.filter(e => e !== member))

    props.removeMembers(props.task.id, props.listTitle, member);
  };
  

  return (
    <div style={{ color: 'black' }}>
      {props.task.members.length ? (
        <div>
          {props.task.members.map((member) => (
            <li
              style={{
                listStyleType: 'none',
                marginTop: '10px',
                cursor: 'pointer',
                justifyContent: 'space-between',
              }}
            >
              <div styel={{ display: 'flex', alignSelf: 'start' }}>
                <MdCancel
                  size="0.8em"
                  style={{ color: 'GrayText' }}
                  onClick={() => handleRemoveMembers(member)}
                />
                &nbsp;&nbsp;{member}
              </div>
            </li>
          ))}
        </div>
      ) : (
        <div style={{ color: 'GrayText' }}>{t('No selected members')}</div>
      )}
    </div>
  );
};

export default Members;
