import { Request, Response } from "express";
import { BaseChainRoute } from "./base-chain-route";
import {Member, TCert} from "hfc/lib/hfc";

export class PublicRoutes extends BaseChainRoute {
    public create():void {
        //log
        console.log("[PublicRoutes.create] Creating public routes.");

        // get grape provenance
        this.router.get("/grape_ownership_trail/:uuid", (req:Request, res:Response) => {
            this.grape_ownership_trail(req,res);
        });

        // get grape signatures
        this.router.get("/grape_signatures/:uuid", (req:Request, res:Response) => {
            this.grape_signatures(req,res);
        });

        // get signer authorizations
        this.router.get("/signer_certs/:farmid", (req:Request, res:Response) => {
            this.signer_certs(req,res);
        });

        // get caller role
        this.router.get("/role", (req:Request, res:Response) => {
            this.get_caller_role(req,res);
        });

        // get caller role
        this.router.get("/role_parties/:role", (req:Request, res:Response) => {
            this.get_role_parties(req,res);
        });

        // get issued accreditations
        this.router.get("/get_issued_accreditations/:party", (req:Request, res:Response) => {
            this.get_issued_accreditations(req,res);
        });
    }

    private grape_ownership_trail(req:Request, res:Response):void {
        this.verifyQueryRequest(req,['uuid'],(err:Error,user:Member,tcert:TCert,ccID:string)=>{
            if(err){
                console.log("Error: %s",err.message);
                res.status(400).send(err.message);
            } else {
                let args = [req.params['uuid']];
                this.queryChaincode(ccID,"grape_ownership_trail",args,user,tcert,(err:Error, result:any)=>{
                    if(err) {
                        console.log("Error: %s",err.message);
                        res.status(400).send(err.message);
                    } else {
                        console.log("Queried results: %s", result);
                        res.type('json').send(result);
                    }
                });
            }
        });
    }

    private grape_signatures(req:Request, res:Response):void {
        this.verifyQueryRequest(req,['uuid'],(err:Error,user:Member,tcert:TCert,ccID:string)=>{
            if(err){
                console.log("Error: %s",err.message);
                res.status(400).send(err.message);
            } else {
                let args = [req.params['uuid']];
                this.queryChaincode(ccID,"grape_signatures",args,user,tcert,(err:Error, result:any)=>{
                    if(err) {
                        console.log("Error: %s",err.message);
                        res.status(400).send(err.message);
                    } else {
                        console.log("Queried results: %s", result);
                        res.type('json').send(result);
                    }
                });
            }
        });
    }

    private signer_certs(req:Request, res:Response):void {
        this.verifyQueryRequest(req,['party'],(err:Error,user:Member,tcert:TCert,ccID:string)=>{
            if(err){
                console.log("Error: %s",err.message);
                res.status(400).send(err.message);
            } else {
                let args = [req.params['party']];
                this.queryChaincode(ccID,"signer_certs",args,user,tcert,(err:Error, result:any)=>{
                    if(err) {
                        console.log("Error: %s",err.message);
                        res.status(400).send(err.message);
                    } else {
                        console.log("Queried results: %s", result);
                        res.type('json').send(result);
                    }
                });
            }
        });
    }

    private get_caller_role(req:Request, res:Response):void {
        this.verifyQueryRequest(req,[],(err:Error,user:Member,tcert:TCert,ccID:string)=>{
            if(err){
                console.log("Error: %s",err.message);
                res.status(400).send(err.message);
            } else {
                let args = [];
                this.queryChaincode(ccID,"get_caller_role",args,user,tcert,(err:Error, result:any)=>{
                    if(err) {
                        console.log("Error: %s",err.message);
                        res.status(400).send(err.message);
                    } else {
                        console.log("Queried results: %s", result);
                        res.type('json').send(result);
                    }
                });
            }
        });
    }

    private get_role_parties(req:Request, res:Response):void {
        this.verifyQueryRequest(req,['role'],(err:Error,user:Member,tcert:TCert,ccID:string)=>{
            if(err){
                console.log("Error: %s",err.message);
                res.status(400).send(err.message);
            } else {
                let args = [req.params['role']];
                this.queryChaincode(ccID,"get_role_parties",args,user,tcert,(err:Error, result:any)=>{
                    if(err) {
                        console.log("Error: %s",err.message);
                        res.status(400).send(err.message);
                    } else {
                        console.log("Queried results: %s", result);
                        res.type('json').send(result);
                    }
                });
            }
        });
    }

    private get_issued_accreditations(req:Request, res:Response):void {
        this.verifyQueryRequest(req,['party'],(err:Error,user:Member,tcert:TCert,ccID:string)=>{
            if(err){
                console.log("Error: %s",err.message);
                res.status(400).send(err.message);
            } else {
                let args = [req.params['party']];
                this.queryChaincode(ccID,"get_issued_accreditations",args,user,tcert,(err:Error, result:any)=>{
                    if(err) {
                        console.log("Error: %s",err.message);
                        res.status(400).send(err.message);
                    } else {
                        console.log("Queried results: %s", result);
                        res.type('json').send(result);
                    }
                });
            }
        });
    }

}