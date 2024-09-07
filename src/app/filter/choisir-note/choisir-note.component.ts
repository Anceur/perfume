import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'; // استيراد Router

@Component({
  selector: 'app-choisir-note',
  templateUrl: './choisir-note.component.html',
  styleUrls: ['./choisir-note.component.scss']
})
export class ChoisirNoteComponent implements OnInit {
  notes: any[] = [];
  currentNoteIndex: number = 0;
  currentNote: any = null;

  constructor(private router: Router) { }  // إضافة Router في الـ constructor

  ngOnInit(): void {
    const app = initializeApp(environment.firebaseConfig);
    const database = getDatabase();

    // Fetch notes from Firebase
    const notesRef = ref(database, 'notes');
    onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      this.notes = Object.values(data);
      this.showNextNote();  // Show the first note
    });
  }

  showNextNote(): void {
    if (this.currentNoteIndex < this.notes.length) {
      this.currentNote = this.notes[this.currentNoteIndex];
    } else {
      this.currentNote = null;  // All notes have been shown
    }
  }

  onChoiceMade(choice: string): void {
    // Log the choice if needed
    console.log(`User chose: ${choice}`);
    
    // Move to the next note
    this.currentNoteIndex++;

    // Check if there are more notes
    if (this.currentNoteIndex >= this.notes.length) {
      // Redirect to /tabs/tab1
      this.router.navigate(['/tabs/tab1']);
    } else {
      this.showNextNote();
    }
  }
}
