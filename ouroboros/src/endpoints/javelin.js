import { Router } from "express";
 import logger from "../logger";

const javelinClient = require("../client/javelin_client");

const routes = Router();

/**
 * GET /tickets
 *
 * Gets a list of all tickets
 */
routes.get('/', async (request, result) => {
    try{
      const response = await javelinClient.GetAllTickets();
      result.status(200);
      result.json(response)
    }
    catch (err){
      logger.error(`[Ticket Service] ${err.message}`);
      result.status(400);
      result.json({error: err.message});
    }
});

/**
 * POST /tickets
 *
 * Create allottedTickets new tickets in INITIAL state with given facultyId
 */
routes.post('/', async (request, result) => {
    let body = request.body;
    if (body && body.facultyId && body.allottedTickets){
        let createTicketRequest = {facultyId: body.facultyId, allottedTickets: body.allottedTickets};
        const response = await javelinClient.CreateTicket(createTicketRequest);
        result.status(200);
        result.json(response);
    } else{
        result.status(400);
        result.json({ error: 'Request body is invalid'});
    }
});

/**
 * GET /tickets/:ticketId
 *
 * Gets a ticket with ticketId
 */
routes.get('/:ticketId', async (request, result) => {
    let getTicketRequest = {ticketId: request.params.ticketId};
    const response = await javelinClient.GetTicket(getTicketRequest);
    result.status(200);
    result.json(response);
});

/**
 * PUT /tickets/:ticketId
 *
 * Update state, applicant or note of ticket with ticketId
 */
routes.put('/:ticketId', async (request, result) => {
    let body = request.body;
    if (body){
        let modifyTicketRequest = {ticketId: request.params.ticketId};
        if (body.state){
            modifyTicketRequest.state = body.state;
            const response = await javelinClient.UpdateTicket(modifyTicketRequest);
            result.status(200);
            result.json(response);
        }
        else if (body.applicantId){
            modifyTicketRequest.applicantId = body.applicantId;
            const response = await javelinClient.AssignApplicant(modifyTicketRequest);
            result.status(200);
            result.json(response);
        }
        else if (body.note){
            let addNoteRequest = {
                ticketId: request.params.ticketId,
                text: body.note
            };
            const response = await javelinClient.AddNote(addNoteRequest);
            result.status(200);
            result.json(response);
        } else {
            result.status(400);
            result.json({ error: 'Request body is invalid'});
        }
    } else{
        result.status(400);
        result.json({ error: 'Request body is invalid'});
    }
});

/**
 * DELETE /tickets/:ticketId
 *
 * Delete ticket with ticketId
 */
routes.delete('/:ticketId', async (request, result) => {
    let deleteTicketRequest = {ticketId: request.params.ticketId}
    console.log(deleteTicketRequest);
    const response = await javelinClient.DeleteTicket(deleteTicketRequest);
    result.status(200);
    result.json(response);
});

/**
 * PUT /tickets/:ticketId/notes/:noteId
 *
 * Modify a note with noteId that belongs to a ticket with ticketId
 */
routes.put('/:ticketId/notes/:noteId', async (request, result) => {
    let body = request.body;
    if (body && (body.resolved != null)){
        let updateNoteRequest = {ticketId: request.params.ticketId, noteId: request.params.noteId, resolved: body.resolved};
        const response = await javelinClient.UpdateNote(updateNoteRequest);
        result.status(200);
        result.json(response);
    } else{
        result.status(400);
        result.json({ error: 'Request body is invalid'});
    }
});

/**
 * DELETE /tickets/:ticketId/notes/:noteId
 *
 * Delete a note with noteId that belongs to a ticket with ticketId
 */
routes.delete('/:ticketId/notes/:noteId', async (request, result) => {
    let deleteNoteRequest = {ticketId: request.params.ticketId, noteId: request.params.noteId};
    const response = await javelinClient.DeleteNote(deleteNoteRequest);
    result.status(200);
    result.json(response);
});

export default routes;
