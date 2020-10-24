import React from 'react';
import cls from './HomePage.module.less';
import AuthenticatedLayout from "../AuthenticatedLayout";
import {Avatar, List} from 'antd';
import {api} from "../../../shared/api";
import UserAvatar from "../shared/UserAvatar/UserAvatar";

export default () => {
  const [result] = api.useGet("/events")

  return (
    <AuthenticatedLayout title="Archery" contentClass={cls.content}>
      <List
        itemLayout="horizontal"
        dataSource={result?.data?.["eventInfos"]}
        renderItem={item => (<EventListItem item={item} />)}
      />
    </AuthenticatedLayout>
  )
}

function EventListItem({item}) {
  /* TODO Change display after list changes
    const data = [
    {
      title: " seit 01.01.2020 13:10 ",
      description: "3 Pfeil Wertung - Runde 2 von 3"
    },
    {
      title: " von 01.01.2020 13:10 bis 14:30 ",
      description: "3 Pfeil Wertung"
    },
  ];
  */

  const title = (
    <>
      <span className={cls.itemTitleParkour}>{item["parkour"]}</span>
      {/*seit {item["timestamp"]}*/}
    </>
  )
  const description = (
    <>{item["gamemode"]} - Tier {item["animalCount"]} von {item["totalAnimals"]}</>
  )

  const getUserAvatar = info => (<UserAvatar username={info[0]} fullName={`${info[1]} ${info[2]}`} />);

  return (
    <List.Item className={cls.item}>
      <List.Item.Meta title={title} description={description}/>
      <Avatar.Group maxCount={2} maxPopoverPlacement="bottom">
        {getUserAvatar(item["creator"])}
        {item["member"].map(memberInfo => getUserAvatar(memberInfo))}
      </Avatar.Group>
    </List.Item>
  )
}