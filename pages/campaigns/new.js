import React , {Component} from 'react' ;
import Layout from '../../components/Layout';
import { Button, Input, Form , Message } from 'semantic-ui-react' ;
import factory from '../../ethereum/factory' ;
import web3 from '../../ethereum/web3';
import { Router } from '../../routes' ;

class CampaignNew extends Component {
    state = {
        minimumContribution : '' ,
        errorMessage : '' , 
        loading : false
    }

    onSubmit = async (event) => {
        event.preventDefault() ;

        this.setState({loading : true , errorMessage : ''})
        const accounts = await web3.eth.getAccounts() ;
        try {
            await factory.methods
            .createCampaign(this.state.minimumContribution)
            .send({
                from : accounts[0] 
            })

            Router.pushRoute('/') ;
            
        } catch (err) {
            this.setState({errorMessage : err.message}) ;
        }
        this.setState({loading : false})

    }
    render() {
        return (
            <Layout>
                <link
                rel="stylesheet"
                href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
                ></link>
                <h3> Create New Campaign </h3>
                <Form onSubmit = {this.onSubmit} error = {!!this.state.errorMessage} >
                    <Form.Field>
                    <label>Name of Campaign</label>
                    <Input  placeholder='Name' />
                    </Form.Field>
                    <Form.Field>
                    <label>Minumum Contribution</label>
                    <Input 
                        labelPosition='right' 
                        label='In Wei' 
                        placeholder='value'
                        value = {this.state.minimumContribution}
                        onChange = {event => this.setState( { minimumContribution : event.target.value } )}
                     />
                    </Form.Field>
                    <Message error negative>
                        <Message.Header>Oops !! Something went wrong</Message.Header>
                        <p>{this.state.errorMessage}</p>
                    </Message>
                    <Button loading = {this.state.loading} type='submit' primary>Create !</Button>
                </Form>

            </Layout>
        ) ;
    }
}

export default CampaignNew ;