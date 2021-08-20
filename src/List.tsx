import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { v4 as uuidv4 } from 'uuid';

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

export function AlignItemsList(props: { list: any }) {
    const classes = useStyles();

    return (
        <List className={classes.root}>

            {
                props.list.map((item: any) => {
                    return <div key={uuidv4()}> <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={item.name} src={item.img} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.name}
                            secondary={
                                <React.Fragment>
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
                                    {item.habitat && <span>Habitat: {item.habitat}</span> }
                                    {item.habitat && <br />}
                                    {item.evolves_from && <span>Evolves from: {item.evolves_from}</span>}

                                </React.Fragment>

                            }
                        />
                    </ListItem>
                        <Divider variant="inset" component="li" />

                    </div>
                })

            }
        </List>
    );
}
