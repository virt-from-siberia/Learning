import { MongoClient, ObjectId } from 'mongodb'
import MeetupDetail from '../../components/meetups/MeetupDetail'

function MeetupDetails(props) {
  return (
    <>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  )
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://alex:5l3exDU15qo5ECOh@cluster0.qunp1.mongodb.net/meetups?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupsCollection =
    db.collection('meetups')

  const meetups = await meetupsCollection
    .find(
      {},
      {
        _id: 1,
      }
    )
    .toArray()

  client.close()
  return {
    fallback: false,
    paths: meetups.map(meetup => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId

  const client = await MongoClient.connect(
    'mongodb+srv://alex:5l3exDU15qo5ECOh@cluster0.qunp1.mongodb.net/meetups?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupsCollection =
    db.collection('meetups')

  const selectedMeetUp =
    await meetupsCollection.findOne({
      _id: ObjectId(meetupId),
    })

  client.close()

  return {
    props: {
      meetupData: {
        id: selectedMeetUp._id.toString(),
        title: selectedMeetUp.title,
        image: selectedMeetUp.image,
        address: selectedMeetUp.address,
        description: selectedMeetUp.description,
      },
    },
  }
}

export default MeetupDetails
