import { Issues } from "../models/issueSchema";
import express from 'express'

export const issueRouter = express.Router()
const fields = ['issue_title', 'issue_text', 'created_by', 'assigned_to', 'status_text']

issueRouter
    .route('/:project')

    .get(async (req, res) => {
        try {
            const { project } = req.params
            console.log(project)
            let query: any = { project }
            for (const prop in req.query) {
                if (fields.includes(prop.toLowerCase())) query[prop] = req.query[prop]
            }
            const result = await Issues.find(query).select('-project')
            res.json([...result])
        }
        catch (e: any) {
            console.log(e)
        }
    })
    .post(async (req, res) => {
        try {console.log(req.body)
            let project = req.params.project;
            const { issue_title, issue_text, created_by } = req.body;
            const assigned_to = req.body.assigned_to || ""
            const status_text = req.body.status_text || ""
            const issue = new Issues({ ...req.body, project, open: true, created_on: new Date().toISOString(), updated_on: new Date().toISOString() })
            try {
                await issue.save()
            }
            catch (e) {
                return res.status(200).json({ error: 'required field(s) missing' })
            }
            res.json({ assigned_to, status_text, open: true, _id: issue.id, issue_title, issue_text, created_by, created_on: issue.created_on, updated_on: issue.updated_on })
        }
        catch(e: any) {
            console.log(e)
        }
    })
    .put(async (req, res) => {
        try {
            const { project } = req.params
            const { _id } = req.body
            if (!_id) return res.status(200).json({ error: 'missing _id' })



            if (fields.every(item => !(item in req.body))) {
                return res.status(200).json({ error: 'no update field(s) sent', '_id': _id })
            }

            const doc = await Issues.findById(_id).catch(() => null)

            if (!doc) {
                return res.status(200).json({ error: 'could not update', _id })
            }

            for (const prop in req.body) {
                // @ts-expect-error
                if (fields.includes(prop.toLowerCase())) doc[prop] = req.body[prop] || doc[prop] || ''
            }
            if (req.body.open == false) doc.open = false
            doc.updated_on = new Date()
            await doc.save()

            res.json({ result: 'successfully updated', _id })
        }
        catch (e: any) {

        }
    })
    .delete(async (req, res) => {
        try {
            let project = req.params.project;
            const { _id } = req.body
            if (!_id) return res.status(200).json({ error: 'missing _id' })

            const result = await Issues.findByIdAndDelete(_id).catch(() => null)

            if (result) {
                res.json({ result: "successfully deleted", _id })
            }
            else {
                res.status(200).json({ error: "could not delete", _id })
            }
        }
        catch (e: any) {
            console.log(e)
        }
    })
