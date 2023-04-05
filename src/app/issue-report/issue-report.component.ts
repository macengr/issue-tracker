import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IssuesService } from '../issues.service';
import { Issue } from '../issue';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css']
})
export class IssueReportComponent implements OnInit {

  @Output() formClose = new EventEmitter();

  issueForm: FormGroup | undefined;
  suggestions: Issue[] = [];

  constructor(private builder:FormBuilder, private issueService: IssuesService) { }

  ngOnInit(): void {
    this.issueForm = this.builder.group({
      title: [''],
      description: [''],
      priority: [''],
      type: ['']
    });
    this.issueForm.controls['title'].valueChanges.subscribe((title:string) => {
      this.suggestions = this.issueService.getSuggestions(title);
    });
   }

   addIssue() {
    this.issueService.createIssue(this.issueForm?.value);
    this.formClose.emit();
   }
}
