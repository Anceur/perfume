import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, push } from 'firebase/database';
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
      this.showNextNote();  // Show the first note
    });
  }

  showNextNote(): void {
    if (this.currentNoteIndex < this.famillenotes.length) {
      this.currentNote = this.famillenotes[this.currentNoteIndex];
    } else {
      this.currentNote = null;  // All notes have been shown, redirect after the last one
      this.router.navigate(['/tabs/tab1']);  // Redirect to '/tabs/tab1' when all notes are done
    }
  }

  async onChoiceMade(choice: string) {
    const user = await this.authService.getCurrentUser();
  
    if (user) {
      const db = getDatabase();
  
      try {
        if (choice === 'like') {
          await push(ref(db, `users/${user.uid}/likes`), this.currentNote);
        } else if (choice === 'dislike') {
          await push(ref(db, `users/${user.uid}/dislikes`), this.currentNote);
        } else if (choice === 'skip') {
          // Handle skip action if needed
          console.log('User skipped this note');
        }
  
        // Update currentNoteIndex and show the next note
        this.currentNoteIndex++;
        this.showNextNote();  // Display next note after the choice is made
      } catch (error) {
        console.error('Error updating user choice:', error);
      }
    } else {
      console.log('No user is signed in');
    }
  }
}
