import { ValuesOfCorrectTypeRule } from 'graphql'
import React from 'react'
import {Button, Form} from 'semantic-ui-react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'

import {useForm} from '../util/hooks'

function PostForm() {
    const{values, onChange, onSubmit}=useForm(createPostCallback,{
        body:''
    })

    const [createPost, {error} ]=useMutation(CREATE_POST_MUTATION,{
        variables:values,
        update(_, result){
            values.body='';
        }
    })

    function createPostCallback(){
        createPost();
    }
    return (
        <Form onSubmit={onSubmit}>
            <h2>Create a post:</h2>
            <Form.Field>
                <Form.Input
                placeholder="Hi World!"
                name="body"
                onChange={onChange}
                value={values.body}
                />
                <Button type="submit" color="teal">
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )
}
const CREATE_POST_MUTATION=gql`
mutation createPost($body:String!){
    createPost(body:$body){
        id 
        body 
        createdAt
        likes{
            id username createdAt
        }
        likeCount
        comments{
            id body createdAt
        }
        commentCount

    }
}
`
export default PostForm
