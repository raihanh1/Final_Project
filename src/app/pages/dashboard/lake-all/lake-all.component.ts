import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { GlosService } from 'src/app/services/glos.service';

@Component({
  selector: 'app-lake-all',
  templateUrl: './lake-all.component.html',
  styleUrls: ['./lake-all.component.scss']
})
export class LakeAllComponent implements OnInit {
  buoyInformation;
  buoy$;
  selectedId;
  // heroes = HEROES;
  id;


  constructor(
    private buoyService: GlosService, 
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buoyService.getGlos().subscribe((response:any) => {
      this.buoyInformation = response;
      console.log(response);
    });

    
    this.buoy$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = Number(params.get('id'));
        return this.buoyService.getGlos();
      })
    );
  }

  goToBuoy(i) {
    this.router.navigate([`/buoyportal/buoy/${this.buoyInformation[i].id}`])
  }
}
