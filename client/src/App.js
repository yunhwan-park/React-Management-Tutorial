import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CusomterAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress : {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },

})

/* 
// React가 불러오는 순서(간단한 라이프 사이클)

1) constructor()
2) componentWillMount()
3) render()
4) componentDidMount()

// props or state가 변경이 되는 경우 => shouldComponentUpdate() 함수가 실행됨
// 다시 render() 함수 호출됨
*/

class App extends Component
{
  
  constructor(props){
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    });
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }

  componentDidMount()
  {
    this.timer = setInterval(this.progress, 200);
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/api/customers');
    const body = await response.json();

    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState( {completed: completed >= 100 ? 0 : completed + 10 })
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
          {
              this.state.customers ? this.state.customers.map(c =>{
                return (
                  <Customer
                    key={c.id}
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
                )
              })
              :
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <div className={classes.progress}>
                    <CircularProgress variant="determinate" value={this.state.completed} />
                  </div>
                </TableCell>
              </TableRow>
          }
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh={ this.stateRefresh } />
      </div>
    )
  };
}

export default withStyles(styles)(App);
