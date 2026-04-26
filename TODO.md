# SafeReturn Task Tracker

## Approved Plan: Fix AuthForm.jsx Password Field Width + Props

✅ **Step 1**: Create TODO.md for tracking  
✅ **Step 2**: Edit src/components/AuthForm.jsx

- ✅ Added flex styles (`display: flex`, `flex:1`, `width:100%`, gap) to both password/confirm containers
- ✅ Fixed missing props: `name`, `value={form.password/confirm}`, `onChange={handleChange}`
- ✅ Used correct toggles: `togglePassword`, `showConfirmPassword`, `placeholder="Confirm Password"`
  ✅ **Step 3**: Changes applied, dev server auto-reloaded  
  ✅ **Step 4**: Updated TODO.md (current)  
  ✅ **Step 5**: Ready for completion

**Previous Result**: Password fields full width, props fixed.
✅ **Bonus Fix**: Password + Confirm Password now **side-by-side one line** (flex row wrapper)
**AuthForm Result**: Password/confirm horizontal full width ✓
✅ **New**: Added eye toggle to Login.jsx password field ✓
**Final**: Both forms have matching toggle UI. Test @ http://localhost:5173/login
