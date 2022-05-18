import mongoose from "mongoose";

interface IIssue {
    issue_title: string,
    issue_text: string,
    created_by: string,
    project: string,
    assigned_to?: string,
    status_text?: string,
    created_on: Date,
    updated_on: Date,
    open: boolean
}

const issueScheme = new mongoose.Schema<IIssue>({
    issue_title: {type: String, required: true},
    issue_text: {type: String, required: true},
    created_by: {type: String, required: true},
    project: {type: String, required: true},
    assigned_to: {type: String, default: ''},
    status_text: {type: String, default: ''},
    created_on: Date,
    updated_on: Date,
    open: Boolean,

})

export const Issues = mongoose.model('Issue', issueScheme)