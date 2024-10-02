import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, push, set } from 'firebase/database'; // Import 'set' for structured data
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service'; 

@Component({
  selector: 'app-choisir-note',
  templateUrl: './choisir-note.component.html',
  styleUrls: ['./choisir-note.component.scss']
})
export class ChoisirNoteComponent implements OnInit {
  famillenotes: any[] = [];
  currentNoteIndex: number = 0;
  currentNote: any = null;

  constructor(private router: Router, private authService: FirebaseServiceService) { }

  ngOnInit(): void {
    initializeApp(environment.firebaseConfig);
    const database = getDatabase();

    // Fetch notes from Firebase
    const notesRef = ref(database, 'famillenotes');
    onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      this.famillenotes = Object.values(data);
      this.showNextNote(); 
    });
  }

  showNextNote(): void {
    if (this.currentNoteIndex < this.famillenotes.length) {
      this.currentNote = this.famillenotes[this.currentNoteIndex];
    } else {
      this.currentNote = null;  
      this.router.navigate(['/tabs/tab1']);  
    }
  }
async onChoiceMade(choice: string) {
  const user = await this.authService.getCurrentUser();

  if (user) {
    const db = getDatabase();

    try {
      if (this.currentNote && this.currentNote.name) {
        let dataValue;

        if (choice === 'like') {
          dataValue = 5;
        } else if (choice === 'dislike') {
          dataValue = 2;
        } else if (choice === 'skip') {
          this.famillenotes.fill(2);
        }

      
        const noteData = {
          family: this.currentNote.name,  
          data: dataValue 
        };

        await push(ref(db, `users/${user.uid}/likes`), noteData);


        this.currentNoteIndex++;
        this.showNextNote();  
      } 
    } catch  (error) {
      }
    } 
  }  
}