import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',

  templateUrl: './results-component.html',
  styleUrls: ['./results-component.scss']
})
export class ResultsComponent implements OnInit {






  text: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  result: any;



  ngOnInit() {
        this.result = history.state.result;

    // GET ל-webhook או נקודת גישה שבה שמרת את JSON של n8n
    this.http.get<any>('URL_TO_YOUR_N8N_ENDPOINT').subscribe(data => {
      // שליפת המלל מ-pinData
      const analyzeNode = data?.pinData?.['Analyze image'];
      if (analyzeNode?.[0]?.[0]?.content?.[0]?.text) {
        this.text = analyzeNode[0][0].content[0].text;
      } else {
        this.text = 'No text available';
      }
    });
  }
}




 
