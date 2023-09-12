import { PoemBean } from "@/bean/PoemBean"
import { Badge, Card, Image, Text, Group, Avatar, Center, createStyles } from "@mantine/core"

const useStyles = createStyles((theme) =>({
  dynasty: {
    position: 'absolute',
    top: theme.spacing.xs,
    left: 5,
    pointerEvents: 'none',
  }
}))

const PoemCard = ({ index, data, width }: Props) => {
  const {classes, cx, theme} = useStyles()
  return (
    <Card withBorder padding="lg" mt="xs" radius="md" maw="20rem" miw="10rem">
      {/* <Card.Section mb="sm">
        <Image src={''} alt={data.pt_name} height={180} />
      </Card.Section> */}
      <Badge className={classes.dynasty}>{data.pt_name}</Badge>
      <Center>
        <Text fw={700}>{data.title}</Text>
      </Center>
      
      {/* <Group mt="sm">
        <Avatar src={''} radius="sm" />
        <div>
          
          <Text fw={500}>
            {data.pt_name}
          </Text>
        </div>
      </Group> */}
      {data.shiju.split("\n").map((item: string,index) => <Center  key={data.id + '' + index} mt='xs'>
        <Text fz="xs" c="dimmed">
          {item}
        </Text>
      </Center>)}

    </Card>
  )
}

export default PoemCard

type Props = {
  index: number,
  data: PoemBean,
  width: number
}
