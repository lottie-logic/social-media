import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./Notifications.module.css";
import { userInfo } from "os";
import * as React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Card, Button, Grid } from "@nextui-org/react";
import { PrismaClient } from "@prisma/client";
import 'react-activity-feed/dist/index.css';

import {
  StreamApp,
  NotificationDropdown,
  FlatFeed,
  LikeButton,
  Activity,
  CommentList,
  CommentField,
  StatusUpdateForm,
  FollowButton,
} from "react-activity-feed";
import stream from "getstream";


const Notifications: NextPage = ({ users }) => {

  // console.log('user token', users.userToken)
  const session = useSession();
  // console.log('session',session.data?.user)
  // console.log('session',session.data?.user?.userToken)

  // const streamString = (session.data?.user?.userToken)
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
  const appID = process.env.NEXT_PUBLIC_STREAM_APP_ID as string;

//  alex token notifications
// const notifyStream = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6IioiLCJhY3Rpb24iOiIqIiwiZmVlZF9pZCI6Im5vdGlmaWNhdGlvbnNhbGV4In0.IAhcBtpLF1pLH_pqwmjN8ox8tvFWq6-exxQXpRxmDgI'

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Home for</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}> Notifications</h1>
          {/* <h1 className={styles.title}>
            {" "}
            {users[2].username} {users[2].userToken}
          </h1> */}

          <StreamApp apiKey={apiKey} appId={appID} token={notifyStream}>

            <NotificationDropdown notify />
            <FlatFeed notify feedGroup="notifications"  Activity={(props) => (
            <Activity
              {...props}
              Footer={() => (
                <div style={{ padding: '8px 16px' }}>
                  <LikeButton {...props} />
                  <CommentField activity={props.activity} onAddReaction={props.onAddReaction} />
                  <CommentList activityId={props.activity.id} />
                </div>
              )}
            />
          )}/>
          </StreamApp>
          <Card className={styles.header}>
            <Button onClick={signOut}>Sign Out</Button>
          </Card>
        </main>
      </div>
    </>
  );
};

// export async function getServerSideProps() {
//   const prisma = new PrismaClient();

//   const users = await prisma.users.findMany();
//   // const users = await prisma.users.findMany();
//   // const users = await res.json()

//   return {
//     props: {
//       users: users.map(
//         (user: user) =>
//           ({
//             ...user,
//             username: user.username.toString(),
//             name: user.name.toString(),
//             email: user.email.toString(),
//             registeredAt: user.registeredAt.toISOString(),
//           } as unknown as user)
//       ),
//     },
//   };
// }

export default Notifications;