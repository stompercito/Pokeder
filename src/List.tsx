import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: '36ch',
            margin: "auto",
            textAlign: "center",
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
    }),
);

export function AlignItemsList() {
    const [listData, setListData] = useState(JSON.parse(localStorage.getItem('list')!));

    const classes = useStyles();

    const deleteHandler = (id: string) => {
        const listArr = listData.filter((item: any) => { return item.id !== id });
        localStorage.setItem('list', JSON.stringify(listArr));
        setListData(listArr);
    }

    return (
        <List className={classes.root}>

            {
                listData.map((item: any) => {
                    return <div key={item.id}>
                        <div style={{display: 'flex', margin: '0'}}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={item.name} src={item.img} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.name}
                                    secondary={
                                        <>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                Gender: {item.gender}
                                                <br />
                                                Egg-Group: {item.eggGroup}
                                                <br />
                                                Type: {item.type}
                                                <br />

                                            </Typography>
                                            {item.habitat && <span>Habitat: {item.habitat}</span>}
                                            {item.habitat && <br />}
                                            {item.evolves_from && <span>Evolves from: {item.evolves_from}</span>}

                                        </>
                                    }
                                />
                            </ListItem>
                            <IconButton onClick={() => deleteHandler(item.id)} aria-label="delete">
                                <DeleteIcon style={{color: 'red'}} />
                            </IconButton>
                        </div>

                        <Divider variant="inset" component="li" />

                    </div>
                })

            }
        </List>
    );
}
