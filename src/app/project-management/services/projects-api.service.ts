import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Project } from '../model/project.entity';
import {catchError, combineLatest, forkJoin, map, Observable, retry} from "rxjs";
import {AuthUsers} from "../../authentication/model/auth-users.entity";

@Injectable({
  providedIn: 'root'
})
export class ProjectsApiService extends BaseService<Project>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "/projects";
  }

  getByUser(user: string) {
    return this.http.get<Project[]>(`${this.basePath}${this.resourceEndpoint}`)
      .pipe(
        map(projects => {
          // Filter projects where the 'agents' array contains the specified user
          return projects.filter(project => project.buyAgents && project.sellAgents && (project.sellAgents.includes(user) || project.buyAgents.includes(user)));
        })
      );
  }
}
