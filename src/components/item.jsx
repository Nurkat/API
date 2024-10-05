import React from 'react';
import { DeleteOutlined,EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const {Meta} = Card;

const Item = ({item,refreshStudent,setRefreshStudent,setRefreshTeacher,refreshTeacher}) => {
function handleDeleteUser(user){
  if(user.job){
      fetch(`http://localhost:3000/teachers/${user.id}`,{method:"DELETE"})
      .then(res =>{
        setRefreshTeacher(!refreshTeacher)
      })
  }
  else{
    fetch(`http://localhost:3000/students/${user.id}`,{method:"DELETE"})
    .then(res =>{
      setRefreshStudent(!refreshStudent)
    })
     
  }
}
  return(
<Card
    style={{
      width: 300,
    }}
    actions={[
      <SettingOutlined className='scale-125' key="setting" />,
      <DeleteOutlined onClick={() =>handleDeleteUser(item)} className='hover:!text-red-600 scale-125' key="setting" />,
      <EllipsisOutlined className='scale-125 ' key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title={`${item.name} - ${item.surname}`} 
      description={item.study ? item.study : item.job}
    />
  </Card>
  )
};
export default Item;