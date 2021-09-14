import React , {Component} from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card  , Grid, GridColumn , Button, GridRow} from 'semantic-ui-react'
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/contributeForm";
import { Link } from "../../routes" ;


class showCampaign extends Component {
    static async getInitialProps(props) {
        
        const  campaign = Campaign(props.query.address) ;
        const summary = await campaign.methods.getSummary().call() ;
        console.log(summary) ;

        return {
            address : props.query.address ,
            minimumContribution : summary[0] , 
            balance : summary[1] , 
            requestsCount: summary[2] , 
            approversCount : summary[3] ,
            manager : summary[4]
        } ;

    }


    renderCard() {
        const {
            minimumContribution ,balance , manager , approversCount , requestsCount , 
        } = this.props ;
        const items = [
            {
              header: manager ,
              description: 'The manager created this campaign and can make request to withdraw money' ,
              meta: 'Address of the manager',
              style : {overflowWrap : 'break-word'}
            } ,
            
              {
                header: minimumContribution ,
                description: 'minimum amount of WEI a contributor had to contribute' ,
                meta: 'Minimum Wei',
                style : {overflowWrap : 'break-word'}
              } ,
              {
                header: requestsCount ,
                description: 'A request try to withdraw money from the contract . Request must be approved by approvers .' ,
                meta: 'Number of requests',
                style : {overflowWrap : 'break-word'}
              } ,
              {
                header: approversCount ,
                description: 'Number of people who have contributed uptill now' ,
                meta: 'Approvers count',
                style : {overflowWrap : 'break-word'}
              } ,
              {
                  header : web3.utils.fromWei(balance , 'ether') , 
                  description : 'Campaign balance (ether)' , 
                  meta : 'The balance in this campaign'
              }
          ] ;
        return <Card.Group items={items} />
    }
    render() {
        return (
            <Layout>
                <h3>
                    campaign show
                    <Grid>
                    <GridRow >
                        <GridColumn width = {10}>
                            {this.renderCard()} 
                        </GridColumn>

                        <GridColumn width = {6}>
                                 <ContributeForm  address = {this.props.address}/> 
                        </GridColumn>

                    </GridRow>
                        <GridRow>
                            <GridColumn>
                                <Link route = {`/campaigns/${this.props.address}/requests`} >
                                    <a>
                                        <Button primary>View Requests</Button>
                                    </a>
                                </Link>
                            </GridColumn>
                        </GridRow>
   
                    </Grid>
                </h3>
            </Layout>
        )
    }
}

export default showCampaign ;